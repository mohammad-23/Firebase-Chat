import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signOut, loginUser } from "../actions";
import Chat from "./Chat";

class Landing extends Component {
  componentDidMount() {
    const { history, loginUser } = this.props;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      loginUser(user.user, true);
    } else {
      history.push("/login");
    }
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/login" />;
    }

    return <Chat />;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUser: state.auth.user
  };
};

export default connect(mapStateToProps, { signOut, loginUser })(Landing);
