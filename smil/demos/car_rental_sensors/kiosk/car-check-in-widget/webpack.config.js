
exports = module.exports = {
	entry: [
		"./src/helpers.js",
		"./src/sos.bundle.js",
		"./src/barcodeScanner.js",
		"./src/printer.js",
	],
	output: {
		filename: 'bundle.js',
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
};
