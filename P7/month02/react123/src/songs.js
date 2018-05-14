import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import List from './list';
import Audio from './audio';

import './css/songs.css';


class Songs extends Component {
    constructor() {
        super();
        this.state = { songs: [], mp3Url: '', isPlay: false, percent: 0 };
    }
    chooseSong = (url, isPlay) => { // 子传父通信 -> 父提供一个方法，子调用后将参数回传
        this.setState({mp3Url: url, isPlay});
    }
    playTime = (percent) => {
        this.setState({percent});
    }
    render() {
        return (
            <div className="songs-box">
                <ul>
                    {this.state.songs.map((item, index) => (
                        <List key={index} index={index} {...item} choose={this.chooseSong} percent={this.state.percent}></List>
                    ))}
                </ul>
                <Audio url={this.state.mp3Url} played={this.state.isPlay} playtime={this.playTime}></Audio>
            </div>
        );
    }
    async componentDidMount() {
        // 在react中发送ajax请求 现在我们用axios
        // axios封装了RESTFul 基于promise的 不支持jsonp 可用在服务端
        let { data } = await axios.get('http://musicapi.leanapp.cn/search?keywords=林俊杰');
        this.setState({ songs: data.result.songs });
    }
    /* componentDidMount() {   // 写文章的时候用这段方便理解
        axios.get('/data.json').then(res => {
            this.setState({ songs: res.data.songs });
            console.log(this.state.songs);
        })
    } */
}

render(<Songs></Songs>, window.root);