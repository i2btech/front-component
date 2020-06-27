import gulp, { watch, series } from 'gulp';
import connect from 'gulp-connect';
import plumber from 'gulp-plumber';
import findPort from 'find-port';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';
import htmlbeautify from 'gulp-html-beautify';
import uglify from 'gulp-uglify';
import del from 'del';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

let server_port = 8080;
findPort(server_port, server_port + 10, function(ports) {
	server_port = ports[0];
});

const bases = {
	src: 'src/',
	dist: 'dev/',
	prod: 'prod/',
	docs: 'docs',
	assets: 'assets/'
};

const paths = {
	styles: ['scss/**/*.scss', 'scss/*.scss'],
	css: ['css/**/*.css', 'css/*.css'],
	pugs: ['pug/**/*.pug', '!pug/**/_*.pug', '!pug/_*.pug'],
	ts: ['ts/**/*.ts', 'ts/*.ts'],
	js: ['js/**/*.js', 'js/*.js'],
	jslibs: ['js/libs/**/*.js'],
	img: ['img/**/*.+(png|jpg|gif|svg)'],	
	fonts: ['fonts/*.*']
};

export function connect_server() {
	return connect.server({
		root: bases.dist,
		port: server_port,
		livereload: true
	});
}

export function sass_task() {
	return gulp.src(paths.styles, { cwd: bases.src })	
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(bases.dist + bases.assets + 'css/'))
		.pipe(browserSync.reload({ stream: true }))		
		.pipe(plumber())		
}

export function css_min() {
	return gulp.src(paths.css, { cwd: bases.dist })
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest(bases.prod + 'css/'));
}

export function pug_task() {
	return gulp.src(paths.pugs, { cwd: bases.src })
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest(bases.dist))
		.pipe(browserSync.reload({ stream: true }))
}

export function html() {
  const options = {
    indentSize: 2
  };
  return gulp.src(bases.dist + '*.html')
		.pipe(plumber())
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest(bases.dist))
		.pipe(browserSync.reload({ stream: true }))
}

export function html_min() {
	return gulp.src(bases.dist + '*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(bases.prod));
}

export function scripts() {
	return new Promise((resolve, reject) => {
		webpack(webpackConfig, (err, stats) => {
				if (err) {
						return reject(err)
				}
				if (stats.hasErrors()) {
						return reject(new Error(stats.compilation.errors.join('\n')))
				}
				browserSync.reload({ stream: true })
				resolve()
		})
	});
}

export function script_min() {
	return gulp.src(paths.js, { cwd: bases.dist })
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(bases.prod + bases.assets + 'js/'));
}

export function images() {
	return gulp.src(paths.img, { cwd: bases.src })
		.pipe(plumber())
		.pipe(imagemin([
			imagemin.mozjpeg({progressive: true}),			
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(bases.dist + bases.assets + 'img/'))
}

export function image_prod() {
	return gulp.src(paths.img, { cwd: bases.dist })
		.pipe(plumber())
		.pipe(imagemin({ progressive: true, interlaced: true, svgoPlugins: [{ cleanupIDs: false }] }))
		.pipe(gulp.dest(bases.prod + 'img/'))
}

export function browser_sync() {
	return browserSync({
		server: {
			baseDir: bases.dist
		}
	});
}

export function browser_sync_prod() {
	return browserSync({
		server: {
			baseDir: bases.prod
		}
	});
}

export function watch_task() {
	watch(bases.src + paths.styles[0], series('sass_task'));
	watch(bases.src + paths.pugs[0], series('pug_task'));
	watch(bases.src + paths.js[0], series('scripts'));
	watch(bases.src + paths.img[0], series('images'));
}

export function fonts_copy() {
  return gulp.src(bases.src + paths.fonts)
		.pipe(gulp.dest(bases.dist + bases.assets + '/fonts'));
}

export function scripts_libs_copy() {
	return gulp.src(bases.src + paths.jslibs)
		.pipe(gulp.dest(bases.dist + bases.assets + 'js/libs'));
}

export const clean = () => del([ bases.dist ]);

export default gulp.series(clean, gulp.parallel(pug_task, sass_task, images, fonts_copy, scripts_libs_copy, scripts, browser_sync, watch_task));
export const start = gulp.series(browser_sync, watch_task);
export const build = gulp.series(pug_task, sass_task, images, fonts_copy, scripts_libs_copy, scripts);
export const prod = gulp.series(pug_task, css_min, images, fonts_copy, scripts_libs_copy, script_min);
