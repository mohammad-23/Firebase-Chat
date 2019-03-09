import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Landing extends Component {
    state = {
        user: localStorage.getItem('user')
    }

    componentDidMount() {
        
    } 

    onClick = () => {
        console.log('user');
        localStorage.removeItem('user');
        this.setState({user: null});
    }

    render() {
        if(!this.state.user){
            return <Redirect to='/auth' />
        }

        return (
            <div>
                <button className="ui button primary" onClick={this.onClick}>Log Out</button>
                LANDING!!!
        </div>
        )
    }
};

export default Landing;