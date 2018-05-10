/* 
    组件分为两种：
        函数组件(函数) function
            没有this，没有生命周期，没有状态
        类组件  class
        
*/
import React, { Component } from 'react';
import { render } from 'react-dom';

// 怎么区分是组件还是jsx元素
function School(props) { // 名字大写就是组件，小写是jsx元素
    // 组件必须要有返回值，也可以返回null
    return <h1>{props.song}-{props.singer}</h1>;
}
// School({song: '发如雪', singer: '周杰伦'})

// 调用组件，取组件的返回值，然后再进行渲染
render(<School song="发如雪" singer="周杰伦"></School>, window.root);