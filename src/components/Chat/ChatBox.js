import '../../css/app.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { storage } from 'firebase';
import _isEqual from 'lodash/isEqual';
import _ from 'lodash';

import { Modal, Button } from 'antd';
import { setImg } from '../../actions';

class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUser: {},
            chatData: {},
            message: '',
            props,
            visible: false,
            imgUrl: ''
        };
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            let uid1 = this.props.match.params.id;
            let uid2 = this.props.currentUser.uid;
            let chatKey = (uid1 > uid2) ? (uid1 + '-' + uid2) : (uid2 + '-' + uid1);
            this.ref = firebase.database().ref('conversations/' + chatKey);

            let newMessages = {};
            this.ref.on("value", snapshot => {
                newMessages = snapshot.toJSON();
                this.setState({ chatData: newMessages });
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_isEqual(nextProps, this.state.props)) {
            if (nextProps.match.params.id) {
                let uid1 = nextProps.match.params.id;
                let uid2 = nextProps.currentUser.uid;
                let chatKey = (uid1 > uid2) ? (uid1 + '-' + uid2) : (uid2 + '-' + uid1);
                this.ref = firebase.database().ref('conversations/' + chatKey);

                let newMessages = {};
                this.ref.on("value", snapshot => {
                    newMessages = snapshot.toJSON();
                    this.setState({ chatData: newMessages });
                });
            }
        }
    }

    onClick = (e) => {
        e.preventDefault();
        let selectedUserId = this.props.match.params.id;

        let newPostKey = firebase
            .database()
            .ref()
            .child("conversations")
            .push().key;
        let uid1 = this.props.currentUser.uid;
        let uid2 = selectedUserId;
        let chatKey = (uid1 > uid2) ? (uid1 + '-' + uid2) : (uid2 + '-' + uid1);
        let frbMsg = {
            text: this.state.message,
            timestamp: new Date().toISOString(),
            type: 'text',
            imageUrl: '',
            senderUID: uid1
        };

        var updates = {};
        updates["/conversations/" + chatKey + "/" + newPostKey] = frbMsg;
        firebase
            .database()
            .ref()
            .update(updates);
        this.setState({ message: '' });
    }

    renderMessages = (message, idx) => {
        let currentUser = this.state.props.currentUser;
        let selectedUser = this.state.props.selectedUser

        if (message.senderUID === selectedUser.uid) {
            return (
                <div className="containerMessage" key={idx}>
                    <img src={selectedUser.photoURL} alt="" style={{ width: '100%' }}></img>
                    {message.type === 'text' ? <p>{message.text}</p> : <img src={message.imageUrl} onClick={this.props.setImg(message.imageUrl)}></img>}
                    <span className="time-right">{new Date(message.timestamp).toDateString()}</span>
                </div>
            )
        } else {
            return (
                <div className="containerMessage darker" key={idx}>
                    <img src={currentUser.photoURL} alt="" className="right" style={{ width: '100%' }}></img>
                    {message.type === 'text' ? <p className='right'>{message.text}</p> : <img src={message.imageUrl} onClick={() => { this.props.setImg(message.imageUrl); this.showModal() }}></img>}
                    <span className="time-left">{new Date(message.timestamp).toDateString()}</span>
                </div>
            )
        }
    }

    onFormSubmit = event => {
        event.preventDefault();
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    }


    handleImage = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            console.log(image);
            let storage = firebase.storage();
            const uploadTask = storage.ref(`/Chat_Images/${image.name}`).put(image);
            uploadTask.on('state_changed',
                snapshot => { },
                error => console.log(error),
                () => {
                    // complete function ....
                    storage.ref('Chat_Images').child(image.name).getDownloadURL().then(url => {
                        console.log(url);
                        let selectedUserId = this.props.match.params.id;
                        let newPostKey = firebase
                            .database()
                            .ref()
                            .child("conversations")
                            .push().key;
                        let uid1 = this.props.currentUser.uid;
                        let uid2 = selectedUserId;
                        let chatKey = (uid1 > uid2) ? (uid1 + '-' + uid2) : (uid2 + '-' + uid1);
                        let frbMsg = {
                            text: '',
                            timestamp: new Date().toISOString(),
                            type: 'image',
                            imageUrl: url,
                            senderUID: uid1
                        };
                        var updates = {};
                        updates["/conversations/" + chatKey + "/" + newPostKey] = frbMsg;
                        firebase
                            .database()
                            .ref()
                            .update(updates);
                    })
                });
        }
    }

    render() {
        return (
            <div>
                <div className="chat">
                    {this.props.selectedUser ? (
                        <div className="chat__main">
                            <div>{
                                _.map(this.state.chatData, this.renderMessages)
                            }</div>
                            <div className="chat__footer">
                                <form id="message-form" onSubmit={e => this.onFormSubmit(e)}>
                                    <input
                                        name="message"
                                        type="text"
                                        placeholder="message"
                                        autoFocus autoComplete="off"
                                        value={this.state.message}
                                        onChange={e => this.setState({ message: e.target.value })}
                                    />
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        <i style={{ fontSize: "30px" }} className="file image icon"></i>
                                    </label>
                                    <input id="file-upload" onChange={this.handleImage} type="file" />
                                    <button onClick={this.onClick}>Send</button>
                                </form>
                            </div>
                        </div>
                    ) : (
                            <h2>Please Select a User to Start Chatting</h2>
                        )}
                </div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    footer={null}
                    onCancel={this.handleCancel}
                ><img className="modalImg" src={this.props.image}></img></Modal>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        selectedUser: state.chat.selectedUser,
        currentUser: state.auth.user,
        image: state.chat.image
    }
}


export default connect(mapStateToProps, { setImg })(ChatBox);

























































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