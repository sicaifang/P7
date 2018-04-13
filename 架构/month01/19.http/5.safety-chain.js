let fs = require('fs');
let http = require('http');
let path = require('path');
let url = require('url');

let getHostName = (refer) => {
    let {hostname} = url.parse(refer, true);
};

// 白名单  可以允许某个域名访问这个图片
let whiteList = [
    'www.chd.com'
];

let server = http.createServer((req, res) => {
    let refer = req.headers['referer'] || req.headers['referrer'];
    // 先看一下refer的值啊，还要看图片的请求路径
    // 读取文件 返回给客户端
    let {pathname} = url.parse(req.url, true);

    let file = path.resolve('public', pathname);    // 代表要找的文件

    fs.stat(file, err => {
        if (!err) {
            if (refer) {
                let referHost = getHostName(refer);
                let host = req.headers['host'].split(':')[0];   // localhost:7777 -> localhost
                if (referHost !== host && !whiteList.includes(referHost)) {
                    // 防盗链
                    fs.createReadStream(path.resolve('public', '2.jpg')).pipe(res);
                } else {
                    // 正常显示
                    fs.createReadStream(file).pipe(res);
                }
            } else {
                // 正常显示
                fs.createReadStream(file).pipe(res);
            }
        } else {
            res.end();
        }
    })
}).listen(7777);

// 改hosts
// mac下chmod vi /etc/hosts