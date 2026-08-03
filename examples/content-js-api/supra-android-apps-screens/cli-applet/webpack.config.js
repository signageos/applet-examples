const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SignageOSPlugin = require('@signageos/webpack-plugin');

module.exports = {
	entry: './src/index.js',
	target: ['web', 'es5'],
	output: {
		filename: 'index.js',
		clean: true,
	},
	experiments: {
		typescript: false,
	},
	resolve: {
		extensions: ['.js'],
		fallback: {
			buffer: require.resolve('buffer'),
			crypto: require.resolve('crypto-browserify'),
			events: require.resolve('events/'),
			os: require.resolve('os-browserify/browser'),
			path: require.resolve('path-browserify'),
			stream: require.resolve('stream-browserify'),
			vm: require.resolve('vm-browserify'),
		},
	},
	module: {
		rules: [
			{
				test: /^(.(?!.module.css))*.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							require.resolve('@babel/preset-env'),
							{
								targets: { chrome: '47' },
								forceAllTransforms: true,
							},
						],
					],
				},
				enforce: 'post',
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.TARGET': JSON.stringify('browser'),
		}),
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		new SignageOSPlugin(),
	],
};
