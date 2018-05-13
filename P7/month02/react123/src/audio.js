import React, {Component} from 'react';

export default class Play extends Component {
    render() {
        return (
            <audio ref="audio" src={this.props.url}></audio>
        )
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