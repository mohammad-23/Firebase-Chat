import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { connect } from 'react-redux';
import keys from '../../config/keys';

import { loginUser } from '../../actions';

firebase.initializeApp({
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    databaseURL: keys.databaseURL,
    projectId: keys.projectId,
    storageBucket: keys.storageBucket,
    messagingSenderId: keys.messagingSenderId
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