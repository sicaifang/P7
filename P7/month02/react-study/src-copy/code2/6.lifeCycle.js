import React, { Component } from 'react';
import { render } from 'react-dom';
// 生命周期执行时是同步操作
class LifeCycle extends Component {
    static defaultProps = {
        name: '周杰伦'
    }
    constructor(props) {
        super();
        this.state = {name: props.name, count: 1};
        console.log('constructor')
    }
    componentWillMount() {  // 之后也将被废弃
        console.log('componentWillMount');
    }
    handleClick = () => {
        this.setState({count: this.state.count+1})
    }
    render() {
        console.log('render')
        return (<div>
            <span>计数器：</span>{this.state.count}
            <button onClick={this.handleClick}>点击</button>
            <Child></Child>
        </div>)
    }
    componentDidMount() {
        console.log('componentDidMount');
    }   
    // shouldComponentUpdate可以做优化，一般情况不自己做优化 pureComponent
    shouldComponentUpdate(nextProps, nextState) {   // 如果没有写这个生命周期，默认相当于返回true
        console.log('shouldComponentUpdate');
        if (nextState.count === this.state.count) {
            return false;
        }
        return true;
    }
    componentWillUpdate() { // 这个方法其实没啥用，所以这个方法就被删除了
        console.log('componentWillUpdate')
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
}

class Child extends Component {
    componentWillMount() {
        console.log('child: componentWillMount');
    }
    render() {
        console.log('child: render');
        return <div>子组件</div>
    }
    componentDidMount() {
        console.log('child: componentDidMount');
    }
}   

render(<LifeCycle></LifeCycle>, window.root); 