import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';


class Clock extends Component {
    constructor() {
        super();
        this.state = {date: new Date().toLocaleString(), pos: '北京'};
    }
    handleClick = () => {
        console.log(this);
        ReactDOM.unmountComponentAtNode(window.root);
    }
    render() {
        return (<React.Fragment>
            <p onClick={this.handleClick}>当前时间：{this.state.date}</p>
            <p>坐标：{this.state.pos}</p>
        </React.Fragment>)
    }
    componentDidMount() {
        console.log('mark');
        this.timer = setInterval(() => {
            this.setState({date: new Date().toLocaleString()});
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
}

render(<Clock />, window.root);