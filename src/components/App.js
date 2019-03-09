import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import '../css/app.css';
import Landing from './Landing';
import Register from './Auth/Register';

class App extends Component {    
    componentDidMount () {
        // this.props.fetchUser();
    }

    render () {       
        return (
            <div className='ui container'>
                <BrowserRouter>
                    <div>
                        <Route exact path='/auth' component={Register}/>
                        <Route exact path='/' component={Landing}/>
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