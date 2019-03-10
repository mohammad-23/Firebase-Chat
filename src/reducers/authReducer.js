import { LOGIN, SIGN_OUT, SIGNUP } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    user: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            return { ...state, isSignedIn: action.payload.isSignedIn, user: action.payload.user };
        case SIGNUP:
            return { ...state, isSignedIn: action.payload.isSignedIn, user: action.payload.user };  
        case SIGN_OUT:
            return { ...state, isSignedIn: false, user: null };
        default: 
            return state;
    }
}