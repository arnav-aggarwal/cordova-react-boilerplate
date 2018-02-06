const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');


const common = {
	entry: path.join(__dirname, 'app'),
	output: {
		path: path.join(__dirname, 'www'),
		filename: 'app.js'
	},
	node: {
		fs: 'empty'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader?cacheDirectory',
			exclude: '/node_modules/',
			include: path.join(__dirname, 'app')
		}, {
			test: /\.(svg)$/,
			loader: 'raw-loader'
		}, {
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				'less-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader'
		}]
	},
	cache: true
};

module.exports = merge(common, {
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'www'),
		port: 1200,
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		proxy: {
			'/remove_dev_404s': {
				target: 'goodbye_dev_404s',
				secure: false,
				bypass: (req, res) => {
					if(req.url === '/cordova.js' || req.url === '/favicon.ico') {
						// end the response quick so we don't get 404's
						res.status(200).send('');
					}
				}
			}
		},
		hot: true,
		inline: true,
		progress: true,
		stats: 'errors-only'
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
});
