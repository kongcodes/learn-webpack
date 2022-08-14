// import css from "./style/index.less"; // 是一个 chunk
// import '@babel/polyfill' // usage模式不需要手动引入

const arr = [new Promise(() => {}), new Promise(() => {})]
arr.map((item) => {
	console.log(item)
})
