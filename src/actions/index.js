import { LOGIN, SIGNUP, SIGN_OUT, SELECT_USER, SET_IMAGE } from './types';
import firebase from 'firebase';

export const loginUser = (user, isSignedIn) => {
    let creds = { user, isSignedIn };
    let firebaseData = user;
    firebaseData.isOnline = isSignedIn;
    let userData = {};
    userData["/users/" + user.uid] = firebaseData;
    firebase
        .database()
        .ref()
        .update(userData);
    localStorage.setItem('user', creds);
    return {
        type: LOGIN,
        payload: creds
    }
};

export const setImg = img => {
    return {
        type: SET_IMAGE,
        payload: img
    }
}

export const selectUser = (user) => {
    return {
        type: SELECT_USER,
        payload: user
    }
}


export const registerUser = (user, isSignedIn) => {
    const { password, email, displayName, photoURL } = user;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            user.updateProfile({
                displayName,
                photoURL: photoURL || 'https://previews.123rf.com/images/martialred/martialred1608/martialred160800020/61263273-male-user-account-profile-circle-flat-icon-for-apps-and-websites.jpg'
            }).then(function () {
                // Update successful.
                alert('You have Successfully Registered');
            })
                .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // console.log(error);            
                });
            let creds = { user, isSignedIn };
            return {
                type: SIGNUP,
                payload: creds
            }
        })
}

export const signOut = (user) => {
    firebase.auth().signOut();
    return {
        type: SIGN_OUT
    }
};