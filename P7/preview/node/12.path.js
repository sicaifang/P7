let path = require('path');

//path最常用的只有join和resolve

// 拼一个路径出来
console.log(path.join(__dirname, './b'));   // a/b

// 解析一个绝对路径出来
console.log(path.resolve('./a', './b'));

console.log(path.delimiter);    // 环境变量分割符  mac用:   windows用;

console.log(path.sep);