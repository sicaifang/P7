let {spawn} = require('child_process');
let path = require('path');

let child = spawn('node', ['3.ipc.js'], {
    cwd: path.join(__dirname, 'pro'),
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
});

// ignore 不要子进程的数据
// pipe   建立管道
// null
// inherit

child.send({name: 'NBA'});

child.on('message', data => {
    console.log(data);
    child.kill();   // 杀死进程
});


