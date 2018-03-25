const fs = require('fs');
const path = require('path');

// 写的时候文件不存在 会创建文件
let ws = fs.createWriteStream(path.resolve('1.txt'), {
    highWaterMark: 3,
    autoClose: true,
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666
});

// 写内容的时候 必须是字符串或者是buffer
for (let i = 0; i < 9; i++) {
    let flag = ws.write(i+ '');     // 第一次写一个字符
    console.log(flag);
}