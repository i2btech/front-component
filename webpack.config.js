import path    from 'path'
import webpack from 'webpack'
//import process from 'process'
//var CleanWebpackPlugin = require('clean-webpack-plugin');
//var f = new Date();
//var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

let config = {
  entry: './src/js/main.js',
  output: {
		filename: './main.js',
		path: path.resolve(__dirname, './dev/assets/js/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']/*,
            plugins: [require('babel-plugin-transform-class-properties')]*/
          }
        }
      }
    ]
	},
  plugins: [
		/*new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})*/
    /*new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false
      }
    }),
    new webpack.BannerPlugin({
      banner: ('CheckOut - Oechsle \r * Uploaded on: (' + f.getDate() + ' ' + meses[f.getMonth()] + ', ' + f.getFullYear() + ' - ' + f.getHours() +':'+ f.getMinutes() +''+ (f.getHours() >= 12 ? 'pm' : 'am') + ')  \r * Version: 1.1 \r * @requires jQuery v1.5 or later \r * Autor: Oechsle {webmaster@oechsle.pe}'),
      entryOnly: true
    })*/
  ]
}

/*function scripts() {
	return new Promise(resolve => webpack(config, (err, stats) => {
		if(err) console.log('Webpack', err)
		console.log(stats.toString({ }))
		resolve()
	}))
}*/

module.exports = config; //{ config, scripts }
