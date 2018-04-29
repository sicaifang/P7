

// node在执行的时候 为了实现模块增加了一个闭包
var a = 1;
console.log(global.a);  // undefined


// console.dir(Array.prototype, {showHidden: true})

/*console.time('label');
for(let i = 0; i < 10000; i++) {

}
console.timeEnd('label');*/


// 栈 指的就是代码的调用栈
console.log(1);
console.log(2);
function one() {
    var a = 1;
    console.log(a);
    two();
    function two() {
        var b = 2;
        console.log(b);
        function three() {
            console.log(5);
        }
    }
}
one();
// console.trace();

// 断言 有错误会抛出AssertionError, 测试 mocha kamra
// chai TDD BDD DDD 持续继承    测试覆盖率
// console.assert((1+2)===2, 'error');


console.log(global);
// process 进程
    // argv [ '/usr/local/bin/node', '/Users/you-mac/Desktop/my/2018/珠峰/架构/month01/4.node/1.node.js' ]
        // 后续我们在执行时可能会传递参数 http-server --port 3000
    // pid 进程id 端口占用的情况  lsof -i :8080 kill -9 pid 杀掉进程
    // chdir change directory 工作目录
    // cwd  当前工作目录
    // nextTick 微任务
    // stdout  stderr  strin
// Buffer 存储文件内容 二进制的
// setImmediate 设置立即
console.log('look');
console.log(process.cwd());
process.chdir('..');
console.log(process.cwd());
console.log(__dirname);