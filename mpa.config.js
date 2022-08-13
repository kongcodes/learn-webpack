const { resolve, join } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const minicssPlugin = require('mini-css-extract-plugin')
const glob = require('glob')

const setMPA = () => {
	const entry = {}
	const htmlwebpackplugins = []

	// 查询页面入口文件 及 相应的html模板
	// 提取页面入口名称，用于entry及chunkName
	// new htmlWebpackPlugin
	const entryPath = glob.sync('./src/*/index.js')
	console.log('entryPath----', entryPath) // ['./src/index/index.js', './src/list/index.js' ...]
	entryPath.map((item) => {
		const entryName = item.match(/src\/(.*)\/index\.js$/)[1]
		console.log(entryName) // index list login
		entry[entryName] = item
		// console.log('entry-----', entry)
		htmlwebpackplugins.push(
			// 在这里实例化是没有意义的，最终还要放在 plugins 中展开
			new htmlWebpackPlugin({
				template: join(__dirname, `./src/${entryName}/index.html`), // 使用 join 拼接成绝对路径
				filename: `${entryName}.html`,
				chunks: [entryName],
			})
		)
	})

	return {
		entry,
		htmlwebpackplugins,
	}
}

const { entry, htmlwebpackplugins } = setMPA()

module.exports = {
	mode: 'development',
	entry,
	output: {
		path: resolve(__dirname, './mpa'),
		filename: 'js/[name].js',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new minicssPlugin({
			// filename: "index.css",
			// 将css文件放到style目录下
			filename: 'style/index.css',
		}),
		...htmlwebpackplugins,
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
			// 字体处理
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'font',
						publicPath: '../font', // 想要的正确路径
					},
				},
			},
			// {
			// 	test: /\.html$/,
			// 	loader: "html-withimg-loader",
			// },
		],
	},
}
