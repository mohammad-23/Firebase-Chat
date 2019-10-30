import "../../css/app.css";
import firebase from "firebase";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { selectUser } from "../../actions";

class UsersList extends Component {
  state = {
    usersList: []
  };

  componentDidMount() {
    let firebaseRef = firebase.database().ref("users");

    firebaseRef.on("value", snapshot => {
      this.setState(prevState => ({
        ...prevState,
        usersList: [...prevState.usersList, ...Object.values(snapshot.toJSON())]
      }));
    });
  }

  startChat = user => {
    this.props.selectUser(user);
  };

  renderUsers = () => {
    return this.state.usersList.map(user => {
      if (this.props.currentUser.email !== user.email && user.displayName) {
        return (
          <Link key={user.uid} to={`/chat/${user.uid}`}>
            <li onClick={() => this.startChat(user)} key={user.uid}>
              {user.displayName}
            </li>{" "}
          </Link>
        );
      }

      return null;
    });
  };

  render() {
    return (
      <div className="chat__sidebar" style={{ width: "200px" }}>
        <h3>People Online</h3>
        <ol id="Users" style={{ paddingTop: "15px" }}>
          {this.renderUsers()}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
