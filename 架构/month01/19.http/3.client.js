const http = require('http');

// node可以做爬虫
let options = {
    hostname: 'localhost',
    port: 4000,
    path: '/',
    method: 'get',
    // 告诉服务端我当前要给你发什么样的数据
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': 12
    }
};

let req = http.request(options);
// 前后端通信 靠的都是json字符串
req.end('{"name": "nba"}');