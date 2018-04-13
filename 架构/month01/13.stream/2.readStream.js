const ReadStream = require('./ReadStream');

const rs = new ReadStream('1.txt', {
    flags: 'r',
    // encoding: 'utf8',
    autoClose: true,
    highWaterMark: 3,
    start: 0,
    end: 4
});

rs.on('data', data => {
    console.log(data);
    // rs.pause();
});

rs.on('end', () => {
   console.log('end');
});

// setTimeout(() => {
//     rs.resume();
// }, 2000);