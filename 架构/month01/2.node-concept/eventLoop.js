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