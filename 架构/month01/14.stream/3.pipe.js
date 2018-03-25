// 想读一点写一点

const fs = require('fs');
// 拷贝1.txt到2.txt
let rs = fs.createReadStream('./1.txt', {
    highWaterMark: 3
});
let ws = fs.createWriteStream('./2.txt', {
    highWaterMark: 1
});

// 太麻烦，写的太多了
/*
rs.on('data', chunk => {   // chunk 读到的内容
    let flag = ws.write(chunk);
    console.log(flag);
    if (!flag) {
        rs.pause();
    }
});

ws.on('drain', () => {
    console.log('干了');
    rs.resume();
});*/

// 拷贝
rs.pipe(ws);