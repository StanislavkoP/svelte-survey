const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'buble-loader',
				exclude: /node_modules\/(?!svelte)/,
				options: {
				  objectAssign: 'Object.assign'
				}
			},
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: [
					{
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true,
						preprocess: require('svelte-preprocess')({ browsers:['ie >= 11', 'last 4 version'] })
					}
				}
				]
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.css$/,
				loader: 'postcss-loader',
				options: {
					plugins: [
						autoprefixer({
							overrideBrowserslist:['ie >= 11', 'last 4 version']
						})
					],
					sourceMap: true
				}
			}
		]
	},
	mode,
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false: 'source-map'
};
