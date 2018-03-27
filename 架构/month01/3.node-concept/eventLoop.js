console.log(1);
console.log(2);

// 不写时间，其实默认是4ms
setTimeout(function () {
    console.log(3);
    setTimeout(function () {
        console.log(6);
    });
});

setTimeout(function () {
    console.log(4);
    setTimeout(function () {
        console.log(7);
    });
});

console.log(5);


// 当触发回调函数时，回调函数会写入队列中
setTimeout(function () {
    console.log('定时');
}, 4);
for (var i = 0; i < 10000; i++) {
    console.log(i);
}