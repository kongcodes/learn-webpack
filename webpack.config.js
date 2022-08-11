const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const minicssPlugin = require('mini-css-extract-plugin')
module.exports = {
	// 入口
	entry: { index: './src/index.js' },
	// 出口
	output: {
		// 生成资源存放的位置；path 必须是绝对路径，默认是 dist目录
		path: resolve(__dirname, './dist'),
		// 生成的资源叫什么
		filename: '[name].js',
	},
	mode: 'development',
	plugins: [
		new CleanWebpackPlugin(),
		new minicssPlugin({
			// filename: "index.css",
			// 将css文件放到style目录下
			filename: 'style/index.css',
		}),
		new htmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			chunks: ['index'],
		}),
	],
	resolveLoader: {
		modules: ['node_modules', './myLoaders'],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				// use: ["style-loader", "css-loader"],
				use: [minicssPlugin.loader, 'css-loader'],
			},
			{
				test: /\.less$/,
				use: [
					minicssPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader',
					// 替换成自己手写实现的loader
					// "mini-style-loader",
					// "mini-css-loader",
					// "mini-less-loader",
				],
			},
			{
				test: /\.js$/,
				// use: [resolve(__dirname, "./myLoaders/k-loader.js")],
				use: [
					{
						// loader: resolve(__dirname, "./myLoaders/k-loader.js"),
						loader: 'k-loader',
						options: { title: '你好' },
					},
					{
						// loader: resolve(__dirname, "./myLoaders/l-loader.js"),
						loader: 'l-loader',
					},
				],
			},
			// {
			// 	test: /\.(jpg|png|gif|webp)$/,
			// 	// use: "file-loader",
			// 	use: {
			// 		loader: "file-loader",
			// 		options: {
			// 			name: "[name].[ext]",
			// 			outputPath: "images", // 图片资源存放目录
			// 			publicPath: "../images", // 图片资源引入位置
			// 		},
			// 	},
			// },
			{
				test: /\.(jpg|png|gif|webp)$/,
				// use: "file-loader",
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images', // 图片资源存放目录
							publicPath: '../images', // 图片资源引入位置
							esModule: false,
							limit: 3 * 1024, // 单位：字节
						},
					},
					'image-webpack-loader',
				],
			},
			// {
			// 	test: /\.html$/,
			// 	loader: "html-withimg-loader",
			// },
		],
	},
}
