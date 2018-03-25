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



let i = 9;

function write() {
    let flag = true;
    while (i >= 0 && flag) {
        flag = ws.write(--i+'', 'utf8',() => {});
    }
}

write();

ws.on('drain', function () {
    console.log('抽干');
});