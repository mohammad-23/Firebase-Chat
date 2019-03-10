import '../../css/app.css';
import _ from 'lodash';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";

import { selectUser } from '../../actions';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usersList: {}
        } 
    }

    componentDidMount() {
        let frbRef = firebase.database().ref("users");
        frbRef.on("value", snapshot => {
             this.setState({usersList: snapshot.toJSON()}); 
        });
    }

    startChat = user => {
        this.props.selectUser(user);
    }

    renderUsers = (user) => {
        if(this.props.currentUser.email !== user.email) {
            return (
                <Link key={user.uid} to={`/chat/${user.uid}`}><li onClick={() => this.startChat(user)} key={user.uid}>{user.displayName}</li> </Link>
            )
        }
    }

    render() {
        return (
            <div className="chat__sidebar" style={{ width: '200px' }}>
                <h3>People Connected</h3>
                <ol id="Users">
                    {_.map(this.state.usersList, this.renderUsers)}
                </ol>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        currentUser: state.auth.user
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ selectUser }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList);