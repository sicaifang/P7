const net = require('net');
// 当客户端连接服务端时，会触发回调函数，默认提示输入用户名，就可以通信了
// 自己说的话 不应该通知自己 应该通知别人
let clients = {};
const server = net.createServer(function (socket) {
    server.maxConnections = 3;
    server.getConnections((err, count) => {
        socket.write(`欢迎来到聊天室 当前用户数${count}人，请输入用户名\n`);
    });
    let nickname;
    socket.setEncoding('utf8');
    socket.on('end', () => {
        clients[nickname] && clients[nickname].destory();
        delete clients[nickname];   // 删除用户
    });
    socket.on('data', chunk => {
        if (nickname) {
            // 发言 broadcast
            broadcast(nickname, chunk);
        } else {
            nickname = chunk;
            clients.nickname = socket;
            socket.write(`你的新用户名是：${nickname}`)
        }
    });
});
// 广播出去
function broadcast(nickname, chunk) {
    Object.keys(clients).forEach(key => {
        if (key !== nickname) {
            clients[key].write(`${nickname}: ${chunk} \n`);
        }
    });
}

server.listen(8889);