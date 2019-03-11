import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

import OauthFirebase from './OauthFirebase';
import Signup from './Signup';
import Login from './Login';
import StyledComponents from '../StyledComponents';

const { UppercaseH2 } = StyledComponents;

class Auth extends Component {
    state = {
        isLogin: false
    }

    handleClick = value => {
        this.setState({isLogin: value});
    }

    render() {
        if(this.state.isLogin) {
            return (
                <Col style={{ paddingTop: '20px', paddingBottom: '50px', marginTop: '30px' }} >
                    <Row md={24} lg={12}>
                        <Card style={{ margin: '10px auto', width: '60%' }}>
                            <div style={{ textAlign: 'center' }}>
                                <UppercaseH2>
                                    Register
                                </UppercaseH2>
                                <br />
                                <Signup />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{ padding: '10px' }}>
                                    Or
                                </h2>
                                <OauthFirebase />
                            </div>
                        </Card>
                    </Row>
                </Col>
            )
        } else {
            return (
                <Col style={{ paddingTop: '20px', paddingBottom: '50px', marginTop: '30px' }} >
                    <Row md={24} lg={12}>
                        <Card style={{ margin: '10px auto', width: '60%' }}>
                            <button className="button blue button float-right" onClick={this.handleClick(false)}>Signup</button>
                            <div style={{ textAlign: 'center' }}>
                                <UppercaseH2>
                                    Login
                            </UppercaseH2>
                                <br />
                                <Login />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{ padding: '10px' }}>
                                    Or
                                </h2>
                                <OauthFirebase />
                            </div>
                        </Card>
                    </Row>
                </Col>
            )
        }  
    }
};


export default Auth;

