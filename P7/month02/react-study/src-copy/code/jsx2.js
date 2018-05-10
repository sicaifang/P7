import React from 'react';
import { render } from 'react-dom';

// jsx和html的写法不完全一样
// className 转化成 class
// htmlFor 转化成for属性 label for
// jsx元素可以嵌套
// 相邻的react元素 必须要包起来 必须要加一层
// React.Fragment不会生成一个多余的外层标签，但也起到了包裹的作用
// jsx里面可以放js 里面区分是不是js根据的是{}
// style标签
// dangerouslySetInnerHTML  会导致xss攻击

let name = '周杰伦';
let style = {color:'blue'};
let ele = (
    <React.Fragment>
        <label htmlFor="name">输入焦点</label>
        <input type="text" id="name" />
        <h1 className="red">react学习</h1>
        <h1>react</h1>
        {function name() {

        }()}
        <h2>{name} {/*只支持多行注释*/}</h2>
        {1 === 1 ? true : false}
        <div style={style}>字</div>
        <div dangerouslySetInnerHTML={{__html: '<h6>会导致xss</h6>'}}></div>
    </React.Fragment>
)
render(ele, window.root);