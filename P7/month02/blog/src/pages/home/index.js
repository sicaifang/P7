import React, {Component} from 'react';
import {Form, Input} from 'antd';


export default class Home extends Component {
    render() {
        return (
            <div className="home-page">
                <div className="login-form">
                    <h1>欢迎光临博客</h1>
                    <Form>
                        <Form.Item>
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}