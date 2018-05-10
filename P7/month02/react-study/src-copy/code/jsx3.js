import React from 'react';
import { render } from 'react-dom';

function scholl(name, age) {
    return <h2>{name}, {age}</h2>
}

let ele = (
    <ul><li>{scholl('周杰伦', 18)}</li></ul>
)
let dinner = ['汉堡', '薯条', '可乐'];
// 数组可以直接渲染到页面上
// 渲染列表要用map
let obj = dinner.map((item,index)=> {
    return <li key={index}>{item}</li>;
});


render(obj, window.root);