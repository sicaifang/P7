// 引入自己写的promise
const Promise = require('./Promise');

let p = new Promise(function (resolve, reject) {
    // 先调谁，就走谁
    // reject('错误')
    resolve('ok');

    // throw new Error('我真的受伤了')

    // 写个异步的
    // setTimeout(function () {
    //     resolve('007大战菊花怪');
    // }, 2000)
});

p.then(function (data) {
    console.log(data);
    return data;
}, function (err) {
    console.log(err);
    // return '有返回值就走成功态'
    throw new Error('错就错了')
}).then(function (data) {
    console.log('2 '+data);
}, function (err) {
    console.log(err);
})



// 1.promise实例可以多次then,当成功后会将then中的成功的方法依次执行，我们可以先将then中成功的回调和失败的回调存到数组内，当成功时调用成功的数组即可


// 2.链式调用 promise不能返回this,promise实例链式调用靠的是返回一个新的promise


// 3.如果then中无论是成功的回调还是失败的回调有return返回值，都会走下一个then的成功


// 4.如果第一个promise返回了一个普通值，会进行下一次then的成功回调；如果第一个promise返回了一个新的promise，需要等待返回promise执行的结果传递给下一次的then中

// 5.resolvePromise
// 返回的结果和promise是同一个，既不会成功也不会走失败


// 6.判断x是不是promise,如果x是对象且有then方法是函数我们就认为它是一个promise
/*
let ppp = {};
Object.defineProperty(ppp, 'then', {
    value: function () {
        return new Error('错误了');
    }
});
ppp.then();*/



// 7.有些人写的promise可能既会调用成功，又会调失败。如果两个都调用，先调谁，就只执行谁