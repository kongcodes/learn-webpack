const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const minicssPlugin = require("mini-css-extract-plugin");
module.exports = {
	// 入口
	// entry: "./src/index.js",
	entry: {
		index: "./src/index.js",
		login: "./src/login.js",
	},
	// 出口
	output: {
		// 生成资源存放的位置；path 必须是绝对路径，默认是 dist目录
		path: resolve(__dirname, "./build"),
		// 生成的资源叫什么
		filename: "[name].js",
	},
	mode: "development",
	plugins: [
		new CleanWebpackPlugin(),
		new minicssPlugin({
			filename: "index.css",
		}),
		new htmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
			chunks: ["index"],
		}),
		new htmlWebpackPlugin({
			template: "./public/login.html",
			filename: "login.html",
			chunks: ["login"],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				// use: ["style-loader", "css-loader"],
				use: [minicssPlugin.loader, "css-loader"],
			},
		],
	},
};
