// 默认情况下用户应该是匿名状态
// 通过关键命令改名 r:zhangsan
// 支持显示在线的用户列表  l: 1
// 广播的功能    b: xxx
// 私聊的功能    s: lisi: love

const net = require('net');
let clients = {};
const server = net.createServer(function (socket) {
    let key = socket.remoteAddress + socket.remotePort; // 端口号是随机唯一的
    clients[key] = {
        nickname: '匿名',
        socket
    };
    server.getConnections((err, count) => {
        socket.write(`欢迎来到聊天室 当前用户数${count}人，请输入用户名 \n`);
    });
    // socket.encoding('utf8');
    socket.on('data', chunk => {
        chunk = chunk.toString().replace(/\r\n/, '');
        let chars = chunk.split(':');

        switch (chars[0]) {
            case 'r':   // r: zhangsan  chars[1]=zhangsan
                rename(key, chars[1], socket);
                break;
            case 'l':
                list(socket);
                break;
            case 'b':
                break;
            case 's':
                break;
            default:
                socket.write('当前命令无法解析，重新输入\n');
        }
    });
});

// 改名
function rename(nickname, data, socket) {
    clients[nickname].nickname = data;
    socket.write(`你当前的用户名是${data}`);
}

// 展示用户列表
function list(socket) {
    let str = '当前用户列表是';
    let ls = Object.keys(clients).map(key => {
        return clients[key].nickname;
    });
    socket.write(str + ls);
}

server.listen(9999, function () {
    console.log('连接到9999');
});