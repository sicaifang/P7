import React, { Component } from 'react';
import Play from './play';

export default class Audio extends Component {
    constructor() {
        super();
        this.state = { percent: 0, duration: 0 };
    }
    render() {
        return (
            <div className="box">
                <audio ref="audio" src={this.props.url} onTimeUpdate={this.timeUpdate}></audio>
                <p>{this.state.current}</p>
                {this.props.played ? <Play time={this.state.duration} percent={this.state.percent} width={this.props.width}></Play> : null}
            </div>
        )
    }
    timeUpdate = () => {
        let audio = this.refs.audio;
        let current = parseInt(audio.currentTime);
        let duration = parseInt(audio.duration);
        let percent = Number(current/duration).toFixed(2) * 100;
        console.log(percent);
        this.setState({
            percent,
            duration
        })
    }
    componentDidUpdate() {
        let audio = this.refs.audio;

        if (this.props.played) {
            audio.play();
            console.log('play');
        } else {
            audio.pause();
            clearInterval(this.timer);
        }


    }
}