import '../css/app.css';
import { connect } from 'react-redux';
import * as actions from '../actions';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Chat from './Chat';
import Landing from './Landing';
import Signup from './Auth/Signup';
import Login from './Auth/Login';

class App extends Component {
    render() {
        return (
            <div>
                {!this.props.isSignedIn ? this.props.history.push('/login') :
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={Landing} />
                            <Route exact path='/signup' component={Signup} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/chat' component={Chat} />
                            }
                        </Switch>
                    </BrowserRouter>
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUser: state.auth.user
    }
}

export default connect(mapStateToProps, actions)(App);