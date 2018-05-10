import React, { Component } from 'react';
import { render } from 'react-dom';


// 1.函数的方式 ref
// 2.React.createRef()  v16.3+
class App extends Component {
    constructor() {
        super();
        this.aaa = React.createRef();
    }
    componentDidMount() {
        // this.aaa.focus();
        this.aaa.current.focus();
    }
    render() {
        return (<div>
            {/*<input type="text" ref={input=>this.aaa = input} />*/}
            {/* 会自动的将当前输入框 放在this.aaa.current */}
            <input type="text" ref={this.aaa} />

        </div>)
    }
}
render(<App />, window.root);
/* 
    非受控组件
        1.可以操作dom 获取真实dom
        2.可以和第三方库结合
        3.不需要对当前输入的内容进行校验，也不需要默认值
*/