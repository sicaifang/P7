// 流    可读流   可写流
// 流： 边读边写  不是疯狂的读

let fs = require('fs');

// highWaterMark 每次能读取多少    默认64K我们默认不需要更改

let rs = fs.createReadStream('1.txt', {highWaterMark: 1});  // {highWaterMark: 1} 表示一次读取一个
// 需要监听事件   数据到来的s事件  rs.emit('data', 数据)
// 默认叫非流动模式 => 流动模式(监听的时候)
let arr = [];
rs.on('data', function (chunk) {
    console.log(chunk);
    arr.push(chunk);
    // 暂停   暂停的是on('data')的触发
    rs.pause();

    // 一秒后恢复
    setTimeout(() => {
        rs.resume();    // 恢复data事件的触发
    }, 1000);
});


// 默认data事件不停的触发，直到文件中的数据全部读出来
rs.on('end', function () {
    console.log('end');
    console.log(Buffer.concat(arr).toString());
});

// 文件不存在 走到err
rs.on('err', function (err) {

});


// on('data') on('end') on('err')   resume()    pause()