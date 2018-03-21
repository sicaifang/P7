// 模板字符串

/*let name = 'zfpx';
let age = 9;

let str = `名字是:${name},年龄:${age}`;
console.log(str);*/

// 模板字符串怎么实现的？
/*let name = 'zfpx';
let age = 9;

let str = '名字是:${name},年龄:${age}';
str = str.replace(/\$\{([^}]+)+\}/g, function () {
    console.log(arguments[1]);
    return eval(arguments[1]);
});

console.log(str);*/


/*let arr = ['珠峰','zfpx', 9];
let newArr = arr.map(item => {
    return `<li>
                <span>${item}</span>
            </li>`
});
console.log(newArr);

let s = `<ul>${newArr.join('')}</ul>`;
console.log(s);*/



// 带标签的模板字符串
let name = 'zfpx';
let age = 9;
let address = '北京';

function fn(arr, ...args) {    // ...函数的剩余运算符，只能在函数的最后参数里使用
    console.log(arr);
    console.log(args);
    let str = '';
    for (let i = 0; i < args.length; i++) {
        str += (arr[i]+'('+args[i]+')');
    }
    str += arr[arr.length-1];

    return str;
}
// 函数的名字是随便起的
let newStr = fn`名字是:${name},年龄:${age}。${address}`;
console.log(newStr);



// includes 是否包含 不用再indexOf判断查找
let strs = 'zfpx珠峰jw';
console.log(strs.includes('jw'));

// endsWith 是不是以某个字符结尾  查看是不是png结尾
let img = '1.png';
console.log(img.endsWith('jpg'));

// startsWith   是否以某个字符开头   查看是不是以https开头
let url = 'http://m.news.so.com/';
console.log(url.startsWith('https'));

// padStart 前面补0
// padEnd   后面补0
setInterval(function () {
    let date = new Date();
    let str = `${date.getFullYear()}年${(date.getMonth()+1).toString().padStart(2, 0)}月${date.getDate()}日`;
    console.log(str);
}, 1000);

