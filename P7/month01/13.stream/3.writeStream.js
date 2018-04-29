const fs = require('fs');

let ws = fs.createWriteStream('2.txt', {
    flags: 'w',
    mode: 0o666,
    autoClose: true,
    highWaterMark: 3,   // 默认写是16k
    encoding: 'utf8',
    start: 0
});


// 就两个方法 write和end
// 有一个on事件

// 1.write方法
// 写入的数据必须是字符串或者buffer
let flag = ws.write('1', 'utf8', () => {});     // 异步的方法   有返回值
// flag代表是否还能继续 true为可以继续写入
// flag标识符表示的并不是是否写入  而是能否继续写  但是返回false 也不会丢失，还会写到文件内
console.log(flag);  // true
flag = ws.write('22', 'utf8', () => {});     // 异步的方法   有返回值
console.log(flag);  // false    超过了highWaterMark的3个字符，不能再写了
flag = ws.write('3', 'utf8', () => {});     // 异步的方法   有返回值
console.log(flag);  // false

// 但是2.txt文件里的内容还是都写进去了 =>  1223


// 2.end方法
ws.end('完毕');   // 当写完后 就不能再写了


// 抽干方法 当都写入后触发drain事件
// ws.on('drain', () => {
//     console.log('drain');
// })

ws.on('finish', () => {
    console.log('都完成了');
})