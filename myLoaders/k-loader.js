module.exports = function (source) {
	console.log(source);
	console.log(this.query);
	// return source.replace("hello", "你好");
	// 使用参数
	// return source.replace("hello", this.query.title);
	// 返回多个信息
	// const info = source.replace("hello", this.query.title);
	// this.callback(null, info);
	// 处理异步逻辑
	const callback = this.async();
	setTimeout(() => {
		const info = source.replace("hello", this.query.title);
		callback(null, info);
	}, 3000);
};
