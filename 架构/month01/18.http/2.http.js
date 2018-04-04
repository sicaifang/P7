const http = require('http');

// http是基于tcp的
/*const server = http.createServer(function (req, res) {  // 监听请求的到来

});*/

const server = http.createServer();

server.on('request', (req, res) => {
    // let method = req.method;
    // let httpVersion = req.httpVersion;
    // let url = req.url;
    // let headers = req.headers;  // 请求头的名字都是小写的

    // ES6解构
    let {method, httpVersion, url, headers} = req;
    console.log(method, httpVersion, url, headers);

    // 如果数据 大于64k data事件可能会触发多次
    let arr = [];
    // 没有请求体 不会走data事件，但是会触发end事件
    req.on('data', (data) => {
        arr.push(data);
    });
    req.on('end', () => {
        console.log(Buffer.concat(arr).toString());

        res.write('hi ');
        res.end('world');
    })
});

server.listen(8989);