// fs  
/*
*  fs   fileSystem
*  文件系统 有很多方法   方法有同步/异步
*  readFileSync  readFile
*  异步的第一个参数是callback    callback的第一个参数错误对象
* */
let fs = require('fs');
let path = require('path');
// 同步性能低，阻塞主线程，能用异步就用异步
// 读取文件的时候默认编码是null null表示二进制
// fs.readFile(path.resolve('1.txt'), {flag: 'r'}, function (err, data) {
//     if (err) return console.log(err);
//     console.log(data.toString());
// });

// 以什么编码格式写入文件内
// mode权限
// 二爷一直死读书
// 默认0o666 表示可读可写
// chmod -R 777 *
// -rw-r--r--
// drwxr-xr-x  
fs.writeFile('./2.txt', 'hello world', {mode: 0o666}, function (err) {
    console.log(err);
});

