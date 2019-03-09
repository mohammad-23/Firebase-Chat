import { LOGIN, SIGN_OUT, SIGNUP } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    user: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            return { ...state, isSignedIn: true, user: action.payload };
        case SIGNUP:
            return { ...state, isSignedIn: true, user: action.payload };  
        case SIGN_OUT:
            return { ...state, isSignedIn: false, user: null };
        default: 
            return state;
    }
}