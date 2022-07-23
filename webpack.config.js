const { resolve } = require("path");
module.exports = {
	// 入口
	entry: "./src/index.js",
	// 出口
	output: {
		// 生成资源存放的位置；path 必须是绝对路径，默认是 dist目录
		path: resolve(__dirname, "./build"),
		// 生成的资源叫什么
		filename: "index.js",
	},
	mode: "development",
};
