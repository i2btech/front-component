import gulp, { watch, series } from 'gulp';
import connect from 'gulp-connect';
import plumber from 'gulp-plumber';
import findPort from 'find-port';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import pug from 'gulp-pug';
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';
import htmlbeautify from 'gulp-html-beautify';
import del from 'del';
import webpack from 'webpack';
import webpackConfigDev from './webpack.dev.js';
import webpackConfigProd from './webpack.prod.js';

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

export function css_prod() {
	return gulp.src(paths.css, { cwd: bases.dist + bases.assets })
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest(bases.prod + bases.assets + 'css/'));
}

export function pug_task() {
	return gulp.src(paths.pugs, { cwd: bases.src })
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest(bases.dist))
		.pipe(browserSync.reload({ stream: true }))
}

export function pug_prod() {
	return gulp.src(paths.pugs, { cwd: bases.src })
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest(bases.prod))
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
		webpack(webpackConfigDev, (err, stats) => {
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

export function script_prod() {
	return new Promise((resolve, reject) => {
		webpack(webpackConfigProd, (err, stats) => {
				if (err) {
					return reject(err)
				}
				if (stats.hasErrors()) {
					return reject(new Error(stats.compilation.errors.join('\n')))
				}
				resolve()
		})
	});
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

export function images_prod() {
	return gulp.src(paths.img, { cwd: bases.dist + bases.assets })
		.pipe(plumber())
		.pipe(imagemin({ progressive: true, interlaced: true, svgoPlugins: [{ cleanupIDs: false }] }))
		.pipe(gulp.dest(bases.prod + bases.assets + 'img/'))
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

export function fonts_copy_prod() {
  return gulp.src(bases.dist + bases.assets + paths.fonts)
		.pipe(gulp.dest(bases.prod + bases.assets + '/fonts'));
}

export const clean = () => del([ bases.dist ]);

export const clean_prod = () => del([ bases.prod ]);

export default gulp.series(clean, gulp.parallel(pug_task, sass_task, images, fonts_copy, scripts, browser_sync, watch_task));
export const start = gulp.series(browser_sync, watch_task);
export const build = gulp.series(pug_task, sass_task, images, fonts_copy, scripts);
export const prod = gulp.series(clean_prod, gulp.parallel(pug_prod, css_prod, images_prod, fonts_copy_prod, script_prod));
