// import css from "./style/index.less"; // 是一个 chunk
// import '@babel/polyfill' // usage模式不需要手动引入

import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<h1>hello JSX</h1>)

const arr = [new Promise(() => {}), new Promise(() => {})]
arr.map((item) => {
	console.log(item)
})
