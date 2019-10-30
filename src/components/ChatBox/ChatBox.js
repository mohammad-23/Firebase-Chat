import "../../css/app.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import _isEqual from "lodash/isEqual";
import _ from "lodash";
import { withRouter } from "react-router-dom";

import { Modal } from "antd";
import { setImage } from "../../actions";
import ChatShell from "../ChatShell";

class ChatBox extends Component {
  state = {
    selectedUser: {},
    chatData: [],
    message: "",
    visible: false,
    imgUrl: ""
  };

  componentWillMount() {
    const { match, currentUser } = this.props;

    if (match.params.id) {
      let uid1 = match.params.id;
      let uid2 = currentUser.uid;
      let chatKey = uid1 > uid2 ? uid1 + "-" + uid2 : uid2 + "-" + uid1;
      this.ref = firebase.database().ref("conversations/" + chatKey);

      this.ref.on("value", snapshot => {
        const newMessages = snapshot.toJSON();
        if (newMessages) {
          this.setState({ chatData: newMessages }, () => {
            console.log({ chatData: this.state.chatData });
          });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEqual(nextProps, this.props)) {
      if (nextProps.match.params.id) {
        let uid1 = nextProps.match.params.id;
        let uid2 = nextProps.currentUser.uid;
        let chatKey = uid1 > uid2 ? uid1 + "-" + uid2 : uid2 + "-" + uid1;
        this.ref = firebase.database().ref("conversations/" + chatKey);

        let newMessages = {};
        this.ref.on("value", snapshot => {
          newMessages = snapshot.toJSON();
          this.setState({ chatData: newMessages });
        });
      }
    }
  }

  renderMessages = (message, idx) => {
    const { currentUser, selectedUser } = this.props;
    if (message.senderUID === selectedUser.uid) {
      return (
        <div className="containerMessage" key={idx}>
          <img src={selectedUser.photoURL} alt="" style={{ width: "100%" }} />
          {message.type === "text" ? (
            <p>{message.text}</p>
          ) : (
            <img
              alt=""
              src={message.imageUrl}
              onClick={() => {
                this.props.setImage(message.imageUrl);
                this.setState({ visible: true });
              }}
            />
          )}
          <span className="time-right">
            {new Date(message.timestamp).toDateString()}
          </span>
        </div>
      );
    } else {
      return (
        <div className="containerMessage darker" key={idx}>
          <img
            src={currentUser.photoURL}
            alt=""
            className="right"
            style={{ width: "100%" }}
          />
          {message.type === "text" ? (
            <p className="right">{message.text}</p>
          ) : (
            <img
              alt=""
              src={message.imageUrl}
              onClick={() => {
                this.props.setImage(message.imageUrl);
                this.setState({ visible: true });
              }}
            />
          )}
          <span className="time-left">
            {new Date(message.timestamp).toDateString()}
          </span>
        </div>
      );
    }
  };

  onFormSubmit = event => {
    event.preventDefault();
  };

  handleImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      let storage = firebase.storage();

      const uploadTask = storage.ref(`/Chat_Images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => console.log(error),
        () => {
          storage
            .ref("Chat_Images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              let selectedUserId = this.props.match.params.id;
              let newPostKey = firebase
                .database()
                .ref()
                .child("conversations")
                .push().key;
              let uid1 = this.props.currentUser.uid;
              let uid2 = selectedUserId;
              let chatKey = uid1 > uid2 ? uid1 + "-" + uid2 : uid2 + "-" + uid1;
              let frbMsg = {
                text: "",
                timestamp: new Date().toISOString(),
                type: "image",
                imageUrl: url,
                senderUID: uid1
              };

              var updates = {};

              updates["/conversations/" + chatKey + "/" + newPostKey] = frbMsg;
              firebase
                .database()
                .ref()
                .update(updates);
            });
        }
      );
    }
  };

  onMessageSend = e => {
    e.preventDefault();

    if (this.state.message) {
      let selectedUserId = this.props.match.params.id;
      let newPostKey = firebase
        .database()
        .ref()
        .child("conversations")
        .push().key;
      let uid1 = this.props.currentUser.uid;
      let uid2 = selectedUserId;
      let chatKey = uid1 > uid2 ? uid1 + "-" + uid2 : uid2 + "-" + uid1;
      let frbMsg = {
        text: this.state.message,
        timestamp: new Date().toISOString(),
        type: "text",
        imageUrl: "",
        senderUID: uid1
      };

      let updates = {};

      updates["/conversations/" + chatKey + "/" + newPostKey] = frbMsg;

      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({ message: "" });
    }
  };

  render() {
    return (
      <div>
        <ChatShell>
          <div className="chat">
            <div className="chat__main">
              <div>{_.map(this.state.chatData, this.renderMessages)}</div>
              <div className="chat__footer">
                <form id="message-form" onSubmit={e => this.onMessageSend(e)}>
                  <input
                    name="message"
                    type="text"
                    placeholder="message"
                    autoFocus
                    autoComplete="off"
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                  />
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <i
                      style={{ fontSize: "30px" }}
                      className="file image icon"
                    ></i>
                  </label>
                  <input
                    id="file-upload"
                    onChange={this.handleImage}
                    type="file"
                  />
                  <button onClick={this.onMessageSend}>Send</button>
                </form>
              </div>
            </div>
            )
          </div>
          <Modal
            visible={this.state.visible}
            footer={null}
            onCancel={() => {
              this.setState({
                visible: false
              });
            }}
          >
            <img className="modalImg" alt="" src={this.props.image}></img>
          </Modal>
        </ChatShell>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedUser: state.chat.selectedUser,
    currentUser: state.auth.user,
    image: state.chat.image
  };
};

export default connect(
  mapStateToProps,
  { setImage }
)(withRouter(ChatBox));

// componentWillReceiveProps(nextProps) {
//     console.log('nextProps', nextProps);
//     if(!_isEqual(nextProps, this.state.props)){
//         this.setState({selectedUser: nextProps.selectedUser});
//     }
//     this.getMessages(nextProps);
// }

// getMessages = (nextProps) => {
//     if (!nextProps.selectedUser) return false;

//     let uid1 = nextProps.currentUser.uid;
//     let uid2 = nextProps.selectedUser.uid;
//     let chatKey = (uid1 > uid2) ? (uid1 + '-' + uid2) : (uid2 + '-' + uid1);

//     let ref = firebase.database().ref('conversations/' + chatKey);
//     let newMessages = {}
//     ref.on("value", snapshot => {
//         newMessages = snapshot.toJSON();
//         console.log('snapsht', newMessages);
//     });
//     this.setState({ chatData: newMessages });
//     console.log('STATE', this.state);
//     // this.bottomSpan.scrollIntoView({ behavior: "smooth" })
// }
