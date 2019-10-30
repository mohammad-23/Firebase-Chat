import firebase from "firebase/app";

import { LOGIN, SIGNUP, SIGN_OUT, SELECT_USER, SET_IMAGE } from "./types";

export const loginUser = (user, isSignedIn) => {
  const creds = { user, isSignedIn };

  let firebaseData = user;
  firebaseData.isOnline = isSignedIn;

  let userData = {};
  userData["/users/" + user.uid] = firebaseData;
  firebase
    .database()
    .ref()
    .update(userData);
  localStorage.setItem("user", JSON.stringify(creds));

  return {
    type: LOGIN,
    payload: creds
  };
};

export const setImage = img => {
  return {
    type: SET_IMAGE,
    payload: img
  };
};

export const selectUser = user => {
  return {
    type: SELECT_USER,
    payload: user
  };
};

export const registerUser = (user, isSignedIn) => async dispatch => {
  const { password, email, displayName } = user;

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    var createdUser = firebase.auth().currentUser;
    await createdUser.updateProfile({
      displayName,
      photoURL:
        "https://previews.123rf.com/images/martialred/martialred1608/martialred160800020/61263273-male-user-account-profile-circle-flat-icon-for-apps-and-websites.jpg"
    });

    alert("You have Successfully Registered");

    const creds = { user, isSignedIn };

    dispatch({
      type: SIGNUP,
      payload: creds
    });
  } catch (error) {
    console.log(error);
    alert("Error occured while Signing up.");
  }
};

export const signOut = () => async dispatch => {
  console.log("Logout action");
  try {
    await firebase.auth().signOut();

    dispatch({
      type: SIGN_OUT
    });
  } catch (error) {
    alert("An error while signing out");
  }
};
