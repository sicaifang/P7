let {Duplex} = require('stream');
// 双工流 又能读 又能写，而且读取可以没关系（互不干扰）

let d = Duplex({
    read() {
        this.push('hi');
        this.push(null);
    },
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
});

d.on('data', (data) => {
    console.log(data.toString());
});
d.write('你好');


// class d extends Duplex {
//     _read() {
//
//     }
//     _write() {
//
//     }
// }


// transform流 他就是duplex