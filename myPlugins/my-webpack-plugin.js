class MyWebpackPlugin {
	constructor(options) {
		console.log('options----', options)
	}
	apply(compiler) {
		console.log('compiler----', compiler)
		compiler.hooks.emit.tapAsync('myWebpackPluginEmit', (compilation, cb) => {
			// 添加 1.txt 文件
			const content = '我是在钩子中添加的文件'
			compilation.assets['1.txt'] = {
				source() {
					return content
				},
				size() {
					return content.length
				},
			}
			console.log('compilation---------', compilation.assets)
			cb()
		})
	}
}

module.exports = MyWebpackPlugin
