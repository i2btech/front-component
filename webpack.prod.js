import path from 'path';
import merge from 'webpack-merge';
import config from './webpack.config.js';

module.exports = merge(config, {
	mode: 'production',
  output: {
		filename: './main.js',
		path: path.resolve(__dirname, './prod/assets/js/')
  }
});
