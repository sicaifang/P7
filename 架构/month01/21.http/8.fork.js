// let {fork} = require('child_process');
let path = require('path');

/*
let child = fork('5.fork.js', ['a', 'c', 'e'], {
    cwd: path.join(__dirname, 'pro'),
    silent: true        // 这句话的意思就是['ignore','ignore','ignore','ipc']
});
// 默认支持ipc的方式

child.send('你');*/


// spawn模拟出一个fork
let {spawn} = require('child_process');

function fork(modulePath, args, options = {}) {
    if (options.silent) {
        options.stdio = ['ignore', 'ignore', 'ignore', 'ipc'];
    } else {
        options.stdio = [0, 1, 2, 'ipc']
    }
    return spawn('node', [modulePath, ...args], options);
}

let child = fork('5.fork.js', ['a', 'c', 'e'], {
    cwd: path.join(__dirname, 'pro'),
    silent: true
});
// 默认支持ipc的方式

child.send('你');