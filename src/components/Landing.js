import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import Chat from './Chat';

class Landing extends Component {
    onClick = () => {
        localStorage.removeItem('user');
        this.setState({user: null});
        this.props.signOut();
    }    

    componentDidMount() {
        if(!this.props.currentUser) {
            this.props.history.push('/signup');
        }
    }

    render() {
        if(!this.props.currentUser) {
            return <Redirect to='/signup' />
         }

        return ( 
            <div>
                <Chat onClick={this.onClick}/>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUser: state.auth.user
    }
}

export default connect(mapStateToProps, { signOut })(Landing);