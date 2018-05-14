import React, { Component } from 'react';

export default class Play extends Component {
    constructor() {
        super();
        this.state = { duration: '' };
    }
    formatDate = () => {
        let d = parseInt(this.props.time / 1000),
            m = Math.floor((d % 3600) / 60),
            s = Math.floor(d % 60);

        let duration = `${this.fill(m)}:${this.fill(s)}`;

        this.setState({ duration });
    }
    fill(n) {
        return n < 10 ? '0' + n : '' + n;
    }
    process = () => {
        let bar = this.refs.bar;
        let process = this.refs.process;
        process.style.width = `${this.props.percent}%`;
    }
    render() {
        return (
            <div className="play">
                <div className="process_bar" ref="bar">
                    <p className="process" ref="process"></p>
                </div>
                <div className="duration">{this.state.duration}</div>
            </div>
        )
    }
    componentDidMount() {
        this.formatDate();
    }
    componentDidUpdate() {
        this.process();
    }
}