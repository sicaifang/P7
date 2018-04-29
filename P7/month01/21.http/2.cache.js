// 对比缓存  它需要每次请求的时候对比一下

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
    // async await 7.6+的node版本可以使用
    fs.stat(p, function(err, stat){
        // 第一次你来的时候给你一个标识  下次你再来的时候会带上这个标识
        // 这次你来的时候我用我的标识和你比  如果有区别就返回新文件
        // 8:00 8:00  304
        // 9:00 8:00 这时就返回一个新文件
        // 根据修改时间判断
        // if-modified-since    Last-Modified
        if (!err) {
            let since = req.headers['if-modified-since'];
            if (since) {
                if (since === stat.ctime.toUTCString()) {
                    res.statusCode = 304;
                    res.end();
                } else {
                    sendFile(req, res, p, stat);
                }
            } else {
                sendFile(req, res, p, stat);
            }
        } else {
            sendError(res);
        }
    });
}).listen(8888);

function sendError(res) {
    res.statusCode = 404;
    res.end();
}

function sendFile(req, res, p, stat) {
    // 如果不想看到from memory cache的话，可以强制写成no-cache
    // res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Last-Modified', stat.ctime.toUTCString());
    res.setHeader('Content-Type', mime.getType(p)+';charset=utf8');
    fs.createReadStream(p).pipe(res);
}

