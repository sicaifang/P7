// require('./style.css');
import './less/common.less';
const str = require('./a');

// 手动添加图片
let car = require('./images/1.jpg');
let img = new Image();
img.src = car;
document.body.appendChild(img);
document.getElementById('txt').textContent = str;

console.log('这里是打包的主文件，wp4里默认找的是src下的index.js')

if (module.hot) module.hot.accept();