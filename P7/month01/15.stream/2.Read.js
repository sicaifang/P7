let {Readable} = require('stream');


// 想实现什么流 就继承这个流
// Readable 里面有一个read方法，默认调_read()

class MyRead extends Readable {
    _read() {

    }
}

let mr = new MyRead();
mr.on('data', function (data) {
    console.log(data);
});