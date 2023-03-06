
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SignageOSPlugin = require('@signageos/webpack-plugin')

exports = module.exports = {
	entry: "./src/index.js",
	target: ["web","es5"],
	output: {
		filename: 'index.js',
	},
	resolve: {
		extensions: [".js"],
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
				options: { presets: [require.resolve('@babel/preset-env')] },
				enforce: 'post',
			}
		],
	},
	plugins: [
			new HtmlWebpackPlugin({
				template: 'public/index.html',
			}),
			new SignageOSPlugin()
	],
};
