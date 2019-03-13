import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';


import { BrowserRouter, Route } from 'react-router-dom';
import ChatBox from './ChatBox';
import UserList from './UserList';

const { Sider, Content, Header } = Layout;

class Chat extends Component {
    state = {
        isUserSelected: false
    }

    componentDidMount() {
        if (!this.props.currentUser) {
            return this.props.history.push('/signup');
        }
    }

    onLogout = () => {
        this.props.onClick(this.props.currentUser);
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                        <Layout style={{ minHeight: 'calc(100vh - 130px)' }}>
                            <Sider><UserList /></Sider>
                            <Layout>
                                <Header>
                                    <div>
                                        <button className="ui button primary sign-out" onClick={this.onLogout}>Log Out</button>
                                        <div style={{ color: 'white' }}>{this.props.currentUser ? 'Welcome ' + this.props.currentUser.displayName : ''}</div>
                                    </div>
                                </Header>
                                <Content>
                                    <Route exact path='/chat/:id' component={ChatBox} />
                                </Content>
                            </Layout>
                        </Layout>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.user,
        selectedUser: state.chat.selectedUser
    }
}

export default connect(mapStateToProps)(Chat);

