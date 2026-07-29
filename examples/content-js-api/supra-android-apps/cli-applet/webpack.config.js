const HtmlWebpackPlugin = require('html-webpack-plugin');
const SignageOSPlugin = require('@signageos/webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				test: /^(.(?!.module.css))*.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /supra-screen-sdk\.js$/,
				resourceQuery: /url/,
				type: 'asset/resource',
				generator: {
					filename: 'supra-screen-sdk.js',
				},
			},
			{
				test: /.jsx?$/,
				exclude: /node_modules/,
				resourceQuery: { not: [/url/] },
				loader: 'babel-loader',
				options: { presets: [require.resolve('@babel/preset-env')] },
				enforce: 'post',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		new SignageOSPlugin(),
	],
};
