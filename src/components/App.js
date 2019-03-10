import '../css/app.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';


import Landing from './Landing';
import Chat from './Chat';
// import Register from './Auth/Register';
import OauthFirebase from './Auth/OauthFirebase';

class App extends Component {    
    componentDidMount () {
        // this.props.fetchUser();
    }

    render () {       
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Landing}/>
                        <Route exact path='/auth' component={OauthFirebase}/>
                        <Route exact path='/chat' component={Chat} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, actions)(App);