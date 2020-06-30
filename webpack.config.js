import path    from 'path';

let config = {
  entry: {
		main: './src/js/main.js',
		//demo: './src/js/demo.js',
	},
  output: {
		filename: './[name].js',
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
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
	}
}

module.exports = config;
