
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const SignageOSPlugin = require('@signageos/webpack-plugin')

exports = module.exports = {
	entry: "./src/index.js",
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
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: { presets: [require.resolve('@babel/preset-env')] },
				enforce: 'post',
			}
		],
	},
	plugins: [
			new HtmlWebpackPlugin({
				template: 'public/index.html',
				inlineSource: '.(js|css)$', // embed all javascript and css inline
			}),
			new HtmlWebpackInlineSourcePlugin(),
			new SignageOSPlugin()
	],
};
