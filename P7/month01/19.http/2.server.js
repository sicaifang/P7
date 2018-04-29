const http = require('http');

http.createServer(function (req, res) {
    console.log('hi');
    let result = [];
    req.on('data', (err, data) => {
        result.push(data);
    });
    req.on('end', () => {
        let content = Buffer.concat(result).toString();
        console.log(JSON.parse(content).name);
        res.end('哈喽');
    });
}).listen(4000);