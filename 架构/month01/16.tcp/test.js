let net = require('net');
// 创建一个tcp服务  里面放的是监听函数  当连接到来时才会执行
// socket 套接字 是一个duplex(双工流) 可以支持读写操作
let server = net.createServer(function (socket) {

});
// backlog默认是511
let port =8080;
server.listen(port, 'localhost', function () {
    console.log('监听端口'+port);
});