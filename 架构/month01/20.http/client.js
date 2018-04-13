let options = {
    hostname: 'localhost',
    port: 3999,
    path: '/',
    method: 'GET'
};

let fs = require('fs');
let http = require('http');
let ws = fs.createWriteStream('./download.txt');
let pause = false;
let start = 0;

// 下载，每次获取10个
process.stdin.on('data', chunk => {
    chunk = chunk.toString();
    if (chunk.includes('p')) {
        pause = true;
    } else {
        pause = false;
        download();
    }
});

function download() {
    options.headers = {
        Range: `bytes=${start}-${start + 10}`
    };
    start += 10;
    // 发请求
    http.get(options, (res) => {
        let range = res.headers['content-range'];
        let total = range.split('/')[1];
        let arr = [];
        res.on('data', chunk => {
            arr.push(chunk);
        });
        res.on('end', () => {
            // 将获取的数据写入到文件中
            ws.write(Buffer.concat(arr));
            // 测试1秒下一次
            setTimeout(() => {
                if (pause === false && start < total) {
                    download();
                }
            }, 1000);

        });
    });
}

download();