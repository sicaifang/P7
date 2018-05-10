// 时钟栗子 每秒更新一次 (react 可以根据更改来渲染部分页面 dom-diff)

import React, { Component } from 'react';
import { render } from 'react-dom';

function Clock(props) { // 函数组件 只渲染一次的时候使用，不需要状态
    return (
        <div>
            <span>当前时间：</span>
            {props.date.toLocaleString()}
            div
        </div>
    )
}
// 不会一直渲染 只渲染一次
// 组件的特点 就是复用 多次使用
render(<Clock date={new Date()}/>, window.root);