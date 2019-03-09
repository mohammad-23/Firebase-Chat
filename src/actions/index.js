import { LOGIN, SIGNUP, SIGN_OUT } from './types';

export const loginUser = ( email, password ) => {
    let creds = { email, password };
    localStorage.setItem('user', creds);
    return {
        type: LOGIN,
        payload: creds
    }
};


export const registerUser = ( email, password ) => {
    let creds = { email, password };
    localStorage.setItem('user', creds);
    return {
        type: SIGNUP,
        payload: creds
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};