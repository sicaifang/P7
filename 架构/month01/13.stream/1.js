// 流 node里很多内容都应用到了流
// 流的特点是有序的，有方向的
// 可读流  可写流
// 对文件操作用的也是fs模块

const fs = require('fs');

// socket可读可写流  req可读流


// 返回的是一个可读流对象
const rs = fs.createReadStream('1.txt', {
    flags: 'r',     // 文件的读取操作
    encoding: 'utf8',   // 默认是null  null代表的是buffer
    autoClose: true,    // 读取完毕后自动关闭
    highWaterMark: 3,   // 默认是64k   64*1024字节
    start: 0,
    end: 7          // 不同点：end 包前又包后
});

// 其实一般情况下，{}配置项是不用我们写的
// 不写的话一次读取64k
// const rs = fs.createReadStream('1.txt');
// 监听data事件的时候，data返回的是buffer
// so我们可以设置encoding为utf8
rs.setEncoding('utf8');


// 默认情况下  不会将文件的内容输出
// 内部会创建一个buffer先读取3b

rs.on('open', function () {
    console.log('文件打开了');
});

// 非流动模式(暂停模式)
// 流是基于事件的
// 流动模式会疯狂的触发data事件，直到读取完毕
rs.on('data', function (data) { // 从非流动模式 -> 流动模式
    console.log(data);  // 触发三次data事件， 分别打出123,456,78  从0到7共8个
    rs.pause();     // 暂停读取，会暂停data事件触发
});

setInterval(() => {
    rs.resume();    // 恢复data事件, 继续读取，变为流动模式
                    // 恢复data事件后，还会调用rs.pause，要想再继续触发，把setTimeout换成setInterval
}, 2000);


rs.on('end', function () {
    console.log('end');
});


rs.on('close', function () {
    console.log('文件关闭了');
});

rs.on('error', function (err) {
    console.log(err);
});

/*
*   文件打开了
    123
    456
    78
    end
    文件关闭了
* */