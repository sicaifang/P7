// 主进程 控制子进程
// detach 将主进程关掉，子进程可以自己运行

// unref();

let {spawn} = require('child_process');
let fd = require('fs').openSync('./100.txt', 'w');
let path = require('path');

let child = spawn('node', ['4.detach.js'], {
    cwd: path.join(__dirname, 'pro'),
    stdio: ['ignore', fd, 'ignore'],
    detached: true
});

child.unref();