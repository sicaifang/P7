import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

// 智能组件
class Comments extends Component {
    constructor() {
        super();
        this.state = { comments: [], count: 0 }
    }

    async componentDidMount() {
        // 在react中发送ajax请求 fetch(浏览器默认提供的api)比较底层
        // axios推荐  封装了restfull风格，基于Promise，不支持jsonp，可以在服务端使用
        let { data: comments } = await axios.get('/data.json');
        this.setState({ comments });
    }
    handleAdd = (count) => {
        this.setState({ count: this.state.count + count });
    }
    render() {
        return (
            <div className="container">
                {this.state.comments.map((item, index) => (
                    <List key={index} index={index} {...item} add={this.handleAdd}></List>
                ))}
                <div>总数量：{this.state.count}</div>
            </div>
        )
    }
}

class List extends Component {
    handleClick = () => {
        this.props.add(2);
    }
    render() {
        let style = { borderRadius: '50%' };
        let { avatar, username, content } = this.props;
        return (
            <div className="media">
                <div className="media-left">
                    <img src={avatar} width="32" height="32" style={style} />
                </div>
                <div className="media-body">
                    <h3 className="h3">{username}</h3>
                    <p>{content}</p>
                    <button className="btn btn-success" onClick={this.handleClick}>喜欢</button>
                </div>
            </div>
        )
    }
}

render(<Comments></Comments>, window.root);




/* 
    1.组件间的通信 
        第一种方式就是通过属性传递 父 -> 子 -> 孙子
        单向数据流  数据方向是单向的 子不能改父的属性
    2.父子通信 
        父写好了一个方法 传递给儿子
        儿子调用这个方法，在这个方法中可以去更改状态
    3.同级数据传递
        同级组件想要传递数据 可以找到共同的父级，没有父级就创造父级
*/