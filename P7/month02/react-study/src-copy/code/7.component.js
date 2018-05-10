import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';


// 我们的组件要继承React组件，因为React组件封装了很多方法 如this.setState()

class Clock extends Component {
    constructor() {
        super();
        this.state = { date: new Date().toLocaleString(), location: '北京' }
        
        // 强制将事件绑定到了this上
        this.handleClick = this.handleClick.bind(this); 
    }
    // 如果使用类组件的话，需要提供一个render方法
    // 组件渲染完成后会调用这个生命周期
    componentDidMount() {
        // 什么时候放在this上？ 什么时候放在this.state上？(依赖status可以更新页面)
        this.timer = setInterval(() => {
            // setState可以更新页面
            this.setState({ date: new Date().toLocaleString() });
        }, 1000);
    }
    // 组件将要被卸载
    componentWillUnmount() {
        clearInterval(this.timer);  // 一般卸载组件后要移除定时器和绑定的方法
    }
    // 绑定方法有几种方式 方法中可能会有this
    /*
        1.箭头函数
            <div onClick={() => {
                    this.handleClick();
                }}>
        2.bind绑定this,每次bind都产生一个新函数不好
            <div onClick={this.handleClick.bind(this)}>
        3.在构造函数中绑定this
            this.handleClick = this.handleClick.bind(this);    
        4. es7语法 可以解决this指向
            handleClick = () => {}
    */
    handleClick = () =>{
        console.log(this);  // 直接绑给一个函数的话，此时的this是undefined
        ReactDOM.unmountComponentAtNode(window.root);
    }
    render() {
        return (
            <div onClick={this.handleClick}>
                <span>当前时间：{this.state.date}</span>
                <p>坐标：{this.state.location}</p>
            </div>
        )
    }
}
render(<React.Fragment>
    <Clock />
    <Clock />
</React.Fragment>, window.root);

/*
    组件有两个数据源
        一个是属性 外界传递的
            ？别人传递的属性可能不是我预期的
        还有一个叫状态(state)是自己的
*/