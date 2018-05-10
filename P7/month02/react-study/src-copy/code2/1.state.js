import React, { Component } from 'react';
import { render } from 'react-dom';

class Counter extends Component {
    constructor() {
        super();
        this.state = {count: 1}
    }
    handleClick = () => {
        // 多个状态可以批量更新，写了三个setState但是并不是点一下count+3次
        /* this.setState({count: this.state.count+1});
        this.setState({count: this.state.count+1});
        this.setState({count: this.state.count+1}); */
        this.setState(prevState => ({count: prevState.count + 1}));
        // 如果更新时下一次的状态，要依赖上一次的状态，就写成函数的形式
        this.setState(prevState => ({count: prevState.count + 1}));
    }
    render() {
        return (
            <div>
                <span>计数器：</span>
                {this.state.count}
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}

render(<Counter />, window.root);