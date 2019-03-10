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
    let creds = { user, isSignedIn };
    localStorage.setItem('user', creds);
    return {
        type: SIGNUP,
        payload: creds
    }
}

export const signOut = (user) => {
    firebase.auth().signOut();
    return {
        type: SIGN_OUT
    }
};