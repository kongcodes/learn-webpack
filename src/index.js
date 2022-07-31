import css from "./style/index.less"; // 是一个 chunk
import pic from "./images/1.jpg";

const img = new Image();
img.src = pic;
console.log(pic); //图片路径

const tag = document.getElementById("app");
tag.append(img);

console.log("hello webpack");
