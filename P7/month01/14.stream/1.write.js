const fs = require('fs');
const path = require('path');

// 写的时候文件不存在 会创建文件
let ws = fs.createWriteStream('2.txt', {
    highWaterMark: 3,   // 默认写入是一次16k
    autoClose: true,
    encoding: 'utf8',
    flags: 'w',
    mode: 0o666,
    start: 0
});

// 写内容的时候 必须是字符串或者buffer
for (let i = 0; i < 9; i++) {
    let flag = ws.write(i + '');  // 第一次写一个字符
    console.log(flag);
}

// 当文件被清空的时候才会改成true