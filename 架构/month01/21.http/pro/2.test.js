let fs = require('fs');
let ws = fs.createWriteStream('./1.txt');

process.stdout.on('data', data => {
     ws.write(data);
});

// 可以过1秒关掉进程
setTimeout(() => {
    process.exit();
}, 1000);