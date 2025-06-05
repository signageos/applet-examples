const HtmlWebpackPlugin = require('html-webpack-plugin');
const SignageOSPlugin = require('@signageos/webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


exports = module.exports = {
	entry: "./src/index",
	target: ["web","es5"],
	infrastructureLogging: {
		level: 'warn',
	},
	output: {
		filename: 'index.js',
	},
	externals: {
		qrcode: 'QRCode',
		jquery: 'jQuery' 
	},
	module: {
		rules: [
			{
				test: /^(.(?!\.module\.css))*\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: { presets: [require.resolve('@babel/preset-env')] },
				enforce: 'post',
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		new SignageOSPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: 'public/libs/qrcode.min.js', to: 'libs/qrcode.min.js' },
				{ from: 'public/libs/jquery.min.js', to: 'libs/jquery.min.js' } 
			],
		}),
	],
};
