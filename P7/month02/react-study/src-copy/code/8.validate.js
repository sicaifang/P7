import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Person extends Component {
    // 校验, 不会中断页面渲染
    static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
        gender: PropTypes.oneOf(['男', '女']),
        hobby: PropTypes.array,
        albumNum: function(props,key,com) {
            if (props[key]<10) {
                throw new Error(`${com} error ${props[key]} 这个专辑数也太少了，回到过去了吧`)
            }
        },
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    };
    constructor() {
        super();
    }
    // 类组件的属性会挂载在this.props上
    render() {
        let {name, age, hobby, position, albumNum} = this.props;
        // 对象需要JSON.stringify一下，不然会报错
        return (<div>
            {name}-{age}
            <p>爱好：{hobby}</p>
            <p>{JSON.stringify(position)}</p>
            专辑数：{albumNum}
        </div>)
    }
}

let person = {
    name: '周杰伦',
    age: 39,
    gender: '保密',
    albumNum: 12,
    hobby: ['音乐', '电影'],
    position: {
        x: 123,
        y: 456
    }
};

ReactDOM.render(<Person {...person}/>, window.root);