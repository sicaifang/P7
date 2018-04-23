// node实现子进程有一个自带的模块  child_process
// 可以创建一个进程为我们服务，不会影响当前Node的事件环
// 多进程
// 多核CPU 如果在node里只开一个进程 只会占用一个CPU

// 集群
// let os = require('os').cpus();
// console.log(os.length); // 查看电脑有几个CPU


// 如何创建一个子进程并不复杂，复杂的方面是子进程直之间的通信
// node不适合 cpu密集


// spawn 生产  fork 叉子   exec 执行    execFile 执行文件
let {spawn} = require('child_process');
let path = require('path');

let child = spawn('node', ['1.test.js', 'a', 'b', 'c'], {
    // cwd当前工作区
    cwd: path.join(__dirname, 'pro'),
    // stdio: 'inherit'
});

// 如果不写stdio 默认是管道类型 'pipe'
child.stdout.on('data', data=> {
    console.log(data.toString());
});

// 主进程里面有三个东西
// process.stdin    0
// process.stdout   1
// process.stderr   2


// ----------------------
child.on('exit', () => {
    console.log('exit'); 
});

child.on('close', () => {
    console.log('close');
});

child.on('error', (err) => {
    console.log('发生错误了');
});



// 建立三个进程 第一个进程负责 创建两个进程
// 将第一个进程中的参数 传入到第二个进程中去，在第二个进程中写入到文件中