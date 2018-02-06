const path = require('path');
const webpack = require('webpack');
//simplifies creation of HTML files to serve webpack bundles
//const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	//base directory/absolute path
	context: path.resolve(__dirname, 'cordova-react-boilerplate/app'),
	entry: {
		app: path.join(__dirname, 'app/index.js')
	},
	output: {
		path: path.join(__dirname, 'www'),
		filename: 'app.js'
	},
	devServer: {
		port: 1200,
		//tell the server where to serve static content from
		//contentBase: path.resolve(__dirname, 'dist/assets/media'),
		//hot module replacement
		hot: true,
		//show running processes in console
		progress: true
	},
	//just in case we need this for error reporting
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			}
		],
		rules: [{
			test:  /\.(js|jsx)$/,
			loader: 'babel-loader?cacheDirectory',
			exclude: '/node_modules/',
			include: path.join(__dirname, 'app')
		},{
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				'less-loader'
			]
		},{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		},
		{
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader'
		}]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};

//we’re using node.js and webpack uses the modular pattern,
	//we need to export the configuration object
module.exports = config;
