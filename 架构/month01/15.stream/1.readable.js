const fs = require('fs');

const ReadStream = require('./ReadStream');
const rs = new ReadStream('1.txt', {
    flags: 'r',
    autoClose: true,
    encoding: 'utf8',
    start: 0,
    end: 6,
    highWaterMark: 3
});

// 默认会先读满
// 当缓存区为空时，会默认再去触发readable事件
// 不满缓存区就再去读取
rs.on('readable', function () {
    // let res = rs.read(1);
    // console.log(res);
    // res = rs.read(1);
    // console.log(res);
    // res = rs.read(1);
    // console.log(res);
    
    // 我想读5个，缓存区只有3个
    let result = rs.read(5);
    console.log(result);
});