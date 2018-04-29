// 执行上下文栈   作用域

function one() {
    var a = 1;
    two();
    function two() {
        var b = 2;
        three();
        function three() {
            console.log(b);
        }
    }
}

// one();




console.log(1);
setTimeout(function () {
    console.log('定时器');
},0);
let p = new Promise(function (resolve, reject) {
    console.log(3);
    resolve(100);
}).then(function (data) {
    console.log(data);
});
console.log(2);


// console.log(1);
// setTimeout(function () {
//     console.log(2);
//     Promise.resolve(1).then(function () {
//         console.log('promise')
//     });
// });
// setTimeout(function () {
//     console.log(3);
// });