import '../css/app.css';
import { connect } from 'react-redux';
import * as actions from '../actions';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import Chat from './Chat';
import Landing from './Landing';
// import Register from './Auth/Register';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
// import OauthFirebase from './Auth/OauthFirebase';

class App extends Component {    
    render () {    
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Landing}/>
                        {/* <Route exact path='/auth' component={Register}/>  */}
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/chat' component={Chat} />
                    </div>
                </BrowserRouter>
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