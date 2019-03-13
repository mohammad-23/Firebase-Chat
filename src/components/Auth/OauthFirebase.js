import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { connect } from 'react-redux';
import keys from '../../config/dev';

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
                {this.props.currentUser ? (
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

const mapStateToProps = state => {
    return {
        currentUser: state.auth.user
    }
}

export default connect(mapStateToProps, { loginUser })(OauthFirebase);