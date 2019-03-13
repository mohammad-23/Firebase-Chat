import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import StyledComponents from '../StyledComponents';
import firebase from 'firebase';

import OauthFirebase from './OauthFirebase';
import { loginUser } from '../../actions';

const { UppercaseH2 } = StyledComponents;


class Login extends Component {
  state = {
    redirect: false,
    isLogin: false
  }

  renderError = ({ error, touched, submitting }) => {
    if (touched && error) {
      return (
        <div className="ui error message" style={{ padding: '10px' }}>
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className} style={{ padding: '10px' }}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = ({ email, password }) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push('/');      
      })     
      .catch(error => {
        console.log(error);            
      });
  }

  componentDidMount() {
    let user = localStorage.getItem('user');
    if (user) {
      return (
        <Redirect to="/" />
      )
    }
  }

  handleClick = () => {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <Col style={{ paddingTop: '20px', paddingBottom: '50px', marginTop: '30px' }} >
        <Row md={24} lg={12}>
          <Card style={{ margin: '10px auto', width: '60%' }}>
            <div style={{ textAlign: 'center' }}>
              <UppercaseH2>
                Login
              </UppercaseH2>
              <br />
              <div className="ui container">
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <Field name="email" component={this.renderInput} label="Enter Email" />
                  <Field name="password" component={this.renderInput} label="Enter password" />
                  <button className="ui button primary">Submit</button>
                </form>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ padding: '10px' }}>
                Or
              </h2>
              <button className="ui primary button" onClick={this.handleClick}>Already a user? Signup</button>
              <h3 style={{ padding: '10px' }}>
                Or
              </h3>
              <OauthFirebase />
            </div>
          </Card>
        </Row>
      </Col>
    )
  };
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'Enter your email';
  }

  if (!formValues.password) {
    errors.password = 'Enter your password';
  }

  return errors;
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

Login = connect(mapStateToProps, { loginUser })(Login);

export default reduxForm({
  form: 'loginForm',
  validate
})(Login);

