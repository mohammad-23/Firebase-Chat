import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { connect } from 'react-redux';

import { loginUser } from '../../actions';

firebase.initializeApp({
    apiKey: "AIzaSyDbrW1PpnbvfAfMlATbajl1dRvwm2jjA8Y",
    authDomain: "chat-firebase-0001.firebaseapp.com",
    databaseURL: "https://chat-firebase-0001.firebaseio.com",
    projectId: "chat-firebase-0001",
    storageBucket: "chat-firebase-0001.appspot.com",
    messagingSenderId: "369170871620"
});

class OauthFirebase extends Component {
    state = {
        isSignedIn: false
    };

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user });
            // console.log("user", user);
            if (user) {
                let userObj = {
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    uid: user.uid
                }

                this.props.loginUser(userObj, this.state.isSignedIn);
            }
        });
    }

    render() {
        return (
            <div className="App">
                {this.state.isSignedIn ? (
                    <Redirect to='/' />
                ) : (
                        <div>
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                        </div>
                    )}
            </div>
        )
    }
};


export default connect(null, { loginUser })(OauthFirebase);