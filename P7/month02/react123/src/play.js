import React, { Component } from 'react';

export default class Play extends Component {
    constructor() {
        super();
        this.state = { duration: '', num: 0, total: 0 };
    }
    formatDate = () => {
        let d = parseInt(this.props.time / 1000),
            m = Math.floor((d % 3600) / 60),
            s = Math.floor(d % 60);

        let duration = `${this.fill(m)}:${this.fill(s)}`;

        let total = Math.floor((m + '.' + s) * 100);
        this.setState({ duration, total });

    }
    fill(n) {
        return n < 10 ? '0' + n : '' + n;
    }
    process = () => {
        let bar = this.refs.bar;
        let process = this.refs.process;
        
        this.timer = setInterval(() => {
            this.setState({ num: this.state.num + 1 });
            let scale = Number(bar.offsetWidth / this.state.total).toFixed(1);

            if (this.state.num * scale >= this.state.total) {
                clearInterval(this.timer);
            }
            process.style.width = `${this.state.num}px`;
        }, 1000);
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
        this.process();
    }
    
}