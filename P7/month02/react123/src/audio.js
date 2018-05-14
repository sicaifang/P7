import React, { Component } from 'react';

export default class Audio extends Component {
    render() {
        return (
            <div className="box">
                <audio ref="audio" src={this.props.url} onTimeUpdate={this.timeUpdate}></audio>
                {/* {this.props.played ? <Play time={this.state.duration} percent={this.state.percent} width={this.props.width}></Play> : null} */}
            </div>
        )
    }
    timeUpdate = () => {
        let audio = this.refs.audio;
        let current = parseInt(audio.currentTime);
        let duration = parseInt(audio.duration);
        let percent = Number(current/duration).toFixed(2) * 100;
        
        this.props.playtime(percent);
    }
    componentDidUpdate() {
        let audio = this.refs.audio;

        if (this.props.played) {
            audio.play();
        } else {
            audio.pause();
        }


    }
}