const path = require('path');
const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const HTMLPlugin = require('html-webpack-plugin');

const resolve = (relative) => path.resolve(__dirname, relative);

module.exports = {
	entry: resolve('./src/index.jsx'),
	output: {
		path: resolve('./dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.less'],
	},
	module: {
		loaders: [
			{
				loader: 'babel',
				include: [
					resolve('./src'),
				],
				test: /\.jsx?$/,
			},
			{
				loader: 'style!css!less',
				test: /\.(css|less)?$/,
			},
		],
	},
	plugins: [
		new HTMLPlugin({
			template: resolve('./src/index.html'),
		}),
		new DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			},
		}),
	],
	devtool: 'source-map',
};
