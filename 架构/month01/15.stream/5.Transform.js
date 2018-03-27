let {Transform} = require('stream');


// 他的参数和可写流一样
let transform1 = Transform({
    transform(chunk, encoding, callback) {
        console.log(chunk);
        callback();
    }
});

// 等待你的输入
process.stdin.pipe(transform1);1