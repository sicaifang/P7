// 获取范围请求
let http = require('http');
let fs = require('fs');
let {promisify} = require('util');
let stat = promisify(fs.stat);
// 客户端要发一个头Range:bytes=0-10
// 服务端返回一个头
// Accept-Ranges: bytes
// Content-Range:0-10/总大小

http.createServer(async function (req, res) {
    let p = './content.txt';
    // 判断当前文件的大小
    let statObj = await stat(p);
    let range = req.headers['range'];
    let start = 0;
    let end = statObj.size - 1; // 读流是包前又包后的
    let total = end;

    if (range) {
        // 支持范围请求
        res.setHeader('Accept-Ranges', 'bytes');
        // match得到的数组 ['匹配的字符串', '第一个分组', '第二个分组']
        let result = range.match(/bytes=(\d*)-(\d*)/);
        start = result[1] ? parseInt(result[1]) : start;
        end = result[2] ? parseInt(result[2]) - 1 : end;

        res.setHeader('Content-Range', `${start}-${end}/${total}`);
        console.log(total);
    }
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    fs.createReadStream(p, {start, end}).pipe(res);
}).listen(3999);