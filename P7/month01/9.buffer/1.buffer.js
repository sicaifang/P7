// Buffer是global上的属性
// 申请内存 可以存放 图片 文本
// 长得很像数组
// let buffer = Buffer.alloc(6);   // 这种申请方式内存永远是干净的，声明也比较耗时
// 1通过长度来申请
// let buffer = Buffer.allocUnsafe(6);     // 声明buffer比较快，但是不安全
// buffer.fill(1, 3, 5);   // 没有的部分可以帮我们清空
// console.log(buffer);

// 2通过字符串来申请
// console.log(Buffer.from('阿里巴巴'));   // 不支持gbk node中只支持utf8

// 3通过数组构建buffer
// console.log(Buffer.from([1, 17, 18]));


// 把bufferh和字符串进行转化
/*let buffer = Buffer.alloc(12);
let buff1 = '珠';
let buff2 = '峰培训';
// 写入的内容    偏移量，长度
// utf8下一个汉字3个字节， gbk下一个汉字2个字节
buffer.write(buff1, 0, 3, 'utf8');
buffer.write(buff2, 3, 9, 'utf8');
console.log(buffer.toString());*/


/*
let buffer = Buffer.alloc(12);
let buff1 = '前端';
let buff2 = '架构';    // 架构前端

buffer.write(buff1, 6, 6);
buffer.write(buff2, 0, 6);
console.log(buffer.toString());*/


// 方法 slice indexOf copy concat split

// slice是深拷贝还是浅拷贝？  浅拷贝 会修改引用地址
/*
let arr = [1, [1], 3, 4];
let arr2 = arr.slice(1, 2);
arr2[0][0] = 8;
console.log(arr);   // [ 1, [ 8 ], 3, 4 ]
// buffer和数组中的二维数组是一样的 buffer里存的都是内存地址

let buffer = Buffer.alloc(6, 1);
let newBuff = buffer.slice(0, 3);
newBuff[0] = 100;   // [1, 1, 1] -> [100, 1, 1]
newBuff[1] = 16;    // [100, 1, 1] -> [100, 16, 1]
console.log(buffer);*/


// copy
// let buffer = Buffer.alloc(6);
// let buf1 = Buffer.from('姜');
// let buf2 = Buffer.from('培');
// 培姜
// targetBuffer, offset, sourceStart, sourceEnd
// buf1.copy(buffer, 3, 0, 3);
// buf2.copy(buffer, 0, 0, 3);
// console.log(buffer.toString());

// 怎么实现copy
/*Buffer.prototype.mycopy = function (targetBuffer, offset, sourceStart, sourceEnd) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[i+offset] = this[i];
    }
};
buf1.mycopy(buffer, 3, 0, 3);
buf2.mycopy(buffer, 0, 0, 3);
console.log(buffer.toString());*/


// concat

/*Buffer.myconcat = function (list, totalLength) {
    if (list.length === 1) {
        return list[0];
    }
    if (typeof totalLength === 'undefined') {
        totalLength = list.reduce((prev, next) => {
            return prev + next.length;
        }, 0);
    }
    console.log(totalLength);
    let buf = Buffer.alloc(totalLength);
    let pos = 0;    // 记录当前拷贝的位置
    list.forEach(function (buffer, index) { // [ [1,2,3], [4,5,6] ]
        for (let i = 0; i < buffer.length; i++) {
            buf[pos++] = buffer[i];
        }
    });
    return buf.fill(0, pos);
};

let buff1 = Buffer.from('阿里巴巴');
let buff2 = Buffer.from('坐标杭州');
let newBuffer = Buffer.concat([buff1, buff2]);
let newBuffer2 = Buffer.myconcat([buff1, buff2]);
console.log(newBuffer.toString());
console.log(newBuffer2.toString());*/



// indexOf  取的东西在不在？
let buffer = Buffer.from('珠峰-0-培-0-训');
console.log(buffer.indexOf('--'));  // 6
// split分割方法
Buffer.prototype.mysplit = function (sep) {
    let arr = [];
    let len = sep.length;
    let pos = 0;
    while((index = this.indexOf(sep, pos)) !== -1) {
        arr.push(this.slice(pos, index));
        pos = index + len;
    }
    arr.push(this.slice(pos));
    return arr;
};
console.log(buffer.mysplit('0').toString());