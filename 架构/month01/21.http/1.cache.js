// 对比缓存  它需要每次请求的时候对比一下


// 强制缓存  设置两个头(第一次访问的时候走我们的服务器，在一段时间内以后都不走)
// Expires 过期时间 http1.0的产物 它设置的都是绝对时间
// Cache-Control:  相对时间
// 当访问 localhost:8888/index.html
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
// console.log(mime.getType('1.css')); 

let server = http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url);
    let p = path.join(__dirname, 'public', '.' + pathname);
    console.log(pathname);
    // async await 7.6+的node版本可以使用
    fs.stat(p, function(err, stat){
        if (!err) {
            sendFile(req, res, p);
        } else {
            sendError(res);
        }
    });
}).listen(8888);

function sendError(res) {
    res.statusCode = 404;
    res.end();
}

function sendFile(req, res, p) {
    let date = new Date(Date.now()+10*1000);
    res.setHeader('Expires',date.toUTCString());
    res.setHeader('Cache-Control', 'mac-age=10');
    res.setHeader('Content-Type', mime.getType(p)+';charset=utf8');
    fs.createReadStream(p).pipe(res);
}

