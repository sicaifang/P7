let fs = require('fs');
let path = require('path');
// let index = require('./index');

let result = fs.readFileSync(path.resolve('./1.txt'));


// 爬虫
// let iconv = require('iconv-lite');
// let result = fs.readFileSync(path.resolve('./1.txt'));
// result = iconv.decode(result, 'gbk');


// Buffer的乱码问题
let buffer = Buffer.from('珠峰大本营');
console.log(buffer);
let buff1 = buffer.slice(0, 5);
let buff2 = buffer.slice(5);
let {StringDecoder} = require('string_decoder');
let sd = new StringDecoder();
// console.log(buff1.toString());
// console.log(buff2.toString());
console.log(sd.write(buff1).toString());
console.log(sd.write(buff2).toString());
// 模块来解决输出问题 string_decoder 不识别的不输出 先攒着




// 全局安装 全局路径 npm root -g
// npm link 可以把当前开发的包链接到全局目录下
// 配置package.json下的bin参数
// npm install 也可 npm add 新版本npm>5.0
