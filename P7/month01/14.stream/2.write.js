const fs = require('fs');

// 写的时候文件不存在 会创建文件
let ws = fs.createWriteStream('2.txt', {
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
        flag = ws.write(--i + '', 'utf8', () => {});
        console.log(flag);
    }
}

write();
// drain只有当缓存区充满后 并且被消费后出发
ws.on('drain', () => {
    console.log('抽干');
    write();
});