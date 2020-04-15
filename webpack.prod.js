const path = require('path');
const BabelLoader = require('babel-loader')

module.exports = {
	entry: "./src/main.js",
	output: {
		filename: 'dist.prod.js',
		path: path.resolve(__dirname, 'server/public')
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [
					/node_modules/
				],
				use:[
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				],
			}
		]
	},
	resolve: {
		alias: {
			Root: path.resolve(__dirname, 'src/'),
			Scenes: path.resolve(__dirname, 'src/scenes'), 
			UI: path.resolve(__dirname, 'src/ui')
		}
	}
};
