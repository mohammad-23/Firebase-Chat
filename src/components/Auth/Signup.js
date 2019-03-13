import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';

import StyledComponents from '../StyledComponents';
import OauthFirebase from './OauthFirebase';

const { UppercaseH2 } = StyledComponents;


class Signup extends Component {
  state = {
    redirect: false,
    isLogin: false
  }

  renderError = ({ error, touched, submitting }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className} style={{ padding: '10px' }}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = ({ email, password, displayName }) => {
    const userObj = {
      email,
      password,
      displayName
    };

    this.props.registerUser(userObj, this.props.isSignedIn);
    this.props.history.push('/login');      
  }

  // componentDidMount() {
  //   let user = localStorage.getItem('user');
  // }

  handleClick = () => {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="ui container">
        <Col style={{ paddingTop: '20px', paddingBottom: '50px', marginTop: '30px' }} >
          <Row md={24} lg={12}>
            <Card style={{ margin: '10px auto', width: '60%' }}>
              <div style={{ textAlign: 'center' }}>
                <UppercaseH2>
                  Register
            </UppercaseH2>
                <br />
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <Field name="email" component={this.renderInput} label="Enter Email" />
                  <Field name="password" component={this.renderInput} label="Enter password" />
                  <Field name="displayName" component={this.renderInput} label="Enter Username" />
                  <button className="ui button primary">Submit</button>
                </form>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ padding: '10px' }}>
                  Or
            </h2>
                <button className="ui primary button" onClick={this.handleClick}>Already a user? Login</button>
                <h3 style={{ padding: '10px' }}>
                  Or
            </h3>
                <OauthFirebase />
              </div>
            </Card>
          </Row>
        </Col>
      </div>
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

  if (!formValues.displayName) {
    errors.displayName = 'Enter your username';
  }

  return errors;
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUser: state.auth.user
  }
}

Signup = connect(mapStateToProps, { registerUser })(Signup);

export default reduxForm({
  form: 'signupForm',
  validate
})(Signup);


