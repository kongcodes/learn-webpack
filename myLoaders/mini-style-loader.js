// 操作 DOM，创建 style

module.exports = function (source) {
	return `
		const tag = document.createElement("style")
		tag.innerHTML = ${source}
		document.head.appendChild(tag)
	`;
};
