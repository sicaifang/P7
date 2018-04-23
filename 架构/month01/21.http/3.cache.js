// 当访问 localhost:8888/index.html
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let crypto = require('crypto');
// 2.cache里根据的是最新修改时间
// 这回根据的是文件的内容
// ETag:md5加密成一个串，看两个串是不是一样  if-none-match
let server = http.createServer(function (req, res) {
    let {pathname} = url.parse(req.url);
    let p = path.join(__dirname, 'public', '.' + pathname);
    // async await 7.6+的node版本可以使用
    fs.stat(p, function (err, stat) {
        let md5 = crypto.createHash('md5');
        // 用流读文件，万一文件很大呢
        let rs = fs.createReadStream(p);

        rs.on('data', data => {
            md5.update(data);
        });
        rs.on('end', () => {
            let result = md5.digest('hex');  // 当前文件的唯一标识
            // 下次再拿最新文件的加密值  和客户端请求的来比较
            let ifNoneMatch = req.headers['if-none-match'];
            if (result === ifNoneMatch) {
                res.statusCode = 304;
                res.end();
            } else {
                sendFile(req, res, p, result);
            }
        });
    });
}).listen(8888);

function sendError(res) {
    res.statusCode = 404;
    res.end();
}

function sendFile(req, res, p, result) {
    // 如果不想看到from memory cache的话，可以强制写成no-cache
    // res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Etag', result);
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8');
    fs.createReadStream(p).pipe(res);
}

