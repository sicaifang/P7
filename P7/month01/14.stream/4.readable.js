const fs = require('fs');

let rs = fs.createReadStream('1.txt', {
    highWaterMark: 3
});


// 当我只要创建一个流 就会先把缓存区 填满，等待你自己消费read()
// 如果当前缓存区被清空后会再次触发readable事件
// 当你消费小于 最高水位线时， 会自动添加highWaterMark这么多数据
rs.on('readable', function () {
    let result = rs.read(1);
    console.log(rs._readableState.length);  // 缓存区个数
    // result = rs.read(1);
    // console.log(rs._readableState.length);  // 缓存区个数
    setTimeout(() => {
        console.log(rs._readableState.length);  // 5    剩余的2个不足highWaterMark了，再自动添加3个，所以是5个了
    }, 1000);
});
