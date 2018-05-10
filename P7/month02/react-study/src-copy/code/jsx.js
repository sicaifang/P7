import React from 'react';
import {render} from 'react-dom';


// jsx语法 js和xml语法的集合体
// jsx语法通过babel-preset-react解析
let ele = (
    <h1 className="small">
        <span>小姐姐</span>
    </h1>);

// type,props,children
/* console.log(React.createElement(
    "h1",
    { className: "small" },
    React.createElement(
        "span",
        null,
        "\u5C0F\u59D0\u59D0"
    )
)) */

/* 
{type: 'h1', props: {className:'small',children:[
    {type: 'span', props: {children: '小姐姐'}}
]}}
*/

// 先将jsx语法转成 createElement格式 -> 转化成对象 -> render方法渲染
render(ele, document.getElementById('root'));