const net = require('net');
const fs = require('fs');
const ws = fs.createWriteStream('1.txt');
// http req, res

// pipe
let server = net.createServer(function (socket) {
    // 监听客户输入时 将客户端输入的内容写入到文件内容
    socket.pipe(ws);
    setTimeout(function () {
        socket.unpipe(ws);  // 取消管道
    }, 5000);
});

server.listen(8080);