import merge from 'webpack-merge';
import config from './webpack.config.js';

module.exports = merge(config, {
	mode: 'development'
});
