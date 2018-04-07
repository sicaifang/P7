const http = require('http');

const server = http.createServer((req, res) => {
    // write方法不能在end之后调用
    // res.write()
    // res.end()
    // 响应可以设置响应头

    // 默认情况下返回给客户端内容 200
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('name', 'nba');
    res.end('ok');
}).listen(3000);