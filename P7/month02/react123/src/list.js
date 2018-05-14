import React, { Component } from 'react';
import Play from './play';

export default class List extends Component {
    constructor() {
        super();
        this.state = { cls: '', isGo: false, isPlay: true, width: 0 };
    }
    handleClick = () => {
        let list = this.refs.list;
        
        this.setState({cls: 'active', isGo: true, isPlay: !this.state.isPlay, width: list.offsetWidth});
        
        this.props.choose(`http://music.163.com/song/media/outer/url?id=${this.props.id}.mp3`, this.state.isPlay, list.offsetWidth);
    }
    render() {
        let { album, name, artists, duration } = this.props;
        return (
            <li ref="list">
                <a href="javascript:;" onClick={this.handleClick} className={this.state.cls}>
                    <div className="wrap">
                        <div className="pic">
                            <img src={album.picUrl} />
                        </div>
                        {/* {this.state.isGo ? <Play time={duration} currentTime={this.props.current} width={this.state.width}></Play> : null} */}
                        <h4 className="name">{name}</h4>
                        <div className="player">{artists[0].name}</div>
                    </div>
                </a>
            </li>
        );
    }
}