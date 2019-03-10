import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import Chat from './Chat';

class Landing extends Component {
    state = {
        user: localStorage.getItem('user'),

    }

    componentDidMount() {
        
    } 

    onClick = () => {
        localStorage.removeItem('user');
        this.setState({user: null});
        this.props.signOut();
    }    

    render() {
        if(!this.state.user) {
            return <Redirect to='/auth' />
         }

        return ( 
            <div>
                <Chat onClick={this.onClick}/>
            </div>
        )
    }
};

const mapStateToProps = state => {
    console.log(state);
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(null, { signOut })(Landing);