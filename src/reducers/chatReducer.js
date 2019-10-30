import { SELECT_USER, SET_IMAGE } from "../actions/types";

const INITIAL_STATE = {
  selectedUser: null,
  image: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_USER:
      return { ...state, selectedUser: action.payload };

    case SET_IMAGE:
      return { ...state, image: action.payload };

    default:
      return state;
  }
};
