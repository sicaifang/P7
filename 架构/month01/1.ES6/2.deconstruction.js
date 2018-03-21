//  等号左边的结构和等号右边的结构相同

// 数组解构
// let array = [1, 2, 3];
// let [a, b, c] = array;    // 数组的key要对应上
// console.log(a, b, c);

// 对象解构
// 解构的名要一一对应
// 想更改名字采用:的方式
// let {name: n, age, location} = {name: '刘德华', age: 18, location: 'HONGKONG'};
// console.log(n, age, location);


// let arr = [{name: 'zfpx', age: 9}, '回龙观', [1, 2, 3]];
// let [{age, address='东大街'}, b] = arr;    // 如果取不到的会是undefined，但是可以给取不到的值用=赋个默认值
// console.log(b, age, address);



// 应用
function ajax({url='/zhufeng', type='POST', data='', dataType='jsonp'}) {
    console.log(dataType, url, type);
}

ajax({
    type: 'GET',
    data: {
        username: 'nba'
    }
});