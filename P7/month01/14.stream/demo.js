let WriteStream = require('./WriteStream');

let ws = new WriteStream('3.txt', {
    flags: 'w',
    highWaterMark: 3,
    autoClose: true,
    encoding: 'utf8',
    mode: 0o666,
    start: 0
});

// ws.write('你d好', 'utf8', () => {});

let i = 9;

function write() {
    let flag = true;
    while (i >= 0 && flag) {
        flag = ws.write(--i + '', 'utf8', () => {});
        console.log(flag);
    }
}

write();
// drain只有当缓存区充满后 并且被消费后出发
ws.on('drain', () => {
    console.log('抽干');
    write();
});