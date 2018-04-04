let net = require('net');
let {StringDecoder} = require('string_decoder'); // 专门解决buffer乱码
let {Readable} = require('stream');

class IncomingMessage extends Readable {
    _read() {

    }
}

let server = net.createServer(function (socket) {
    parser(socket, function (req, res) {
        server.emit('request', req, res);
    });
});

// 实现parser
function parser(socket, callback) {
    let arr = [];   // 每次读取的数据放到数组中
    let sd = new StringDecoder();
    let im = new IncomingMessage();

    socket.on('readable', fn);

    function fn() {
        let content = socket.read();  // 默认将缓存区内容读干，读完后如果还有会触发readable事件,返回的是个buffer类型
        arr.push(content);
        let str = sd.write(Buffer.concat(arr));
        let res = {
            write: socket.write.bind(socket),
            end: socket.end.bind(socket)
        };

        if (str.match(/\r\n\r\n/)) {
            let result = str.split('\r\n\r\n');
            let head = parseHeader(result[0]);
            // let body = result[1];
            console.log(head);
            // Object.assign(socket, head);
            Object.assign(im, head);
            socket.removeListener('readable', fn);  // 移除监听
            socket.unshift(Buffer.from(result[1])); // 将内容放回流中
            if (result[1]) {    // 有请求体
                socket.on('data', data => {
                    im.push(data);
                    im.push(null);
                    callback(im, res);
                });
            } else {   // 没请求体
                im.push(null);  // 不是null不能成功触发end事件
                callback(im, res);
            }


            // callback(socket);
            // 先默认socket是req对象 (内部又封装了一个可读流 IncomingMessage)
        }
    }
}

// 解析头信息
function parseHeader(head) {
    let lines = head.split('\r\n');
    let start = lines.shift();
    let method = start.split(' ')[0];
    let url = start.split(' ')[1];
    let httpVersion = start.split(' ')[2].split('/')[1];
    let headers = {};
    lines.forEach(line => {
        let row = line.split(':');
        headers[row[0]] = row[1];
    });

    return {url, method, httpVersion, headers};
}

server.on('connection', function () {
    console.log('建立连接');
});

server.on('request', function (req, res) {
    let {method, httpVersion, url, headers} = req;
    console.log(method, httpVersion, url, headers);

    req.on('data', data => {
        console.log('ok', data.toString());
    });

    req.on('end', () => {
        console.log('end');
        let tmp = `
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 2


hello`;
        res.end(tmp);
    })
});

server.listen(3000);