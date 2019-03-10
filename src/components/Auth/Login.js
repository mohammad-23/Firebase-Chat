import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../../actions';

class Login extends Component {
  state = { redirect: false }

  renderError = ({ error, touched, submitting }) => {
    if (touched && error) {
      return (
        <div className="ui error message" style={{ padding: '10px'}}>
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className} style={{ padding: '10px'}}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = ({ user, isSignedIn }) => {
    this.props.loginUser(user, isSignedIn);
    this.setState({ redirect: true })
  }

  componentDidMount() {
    let user = localStorage.getItem('user');
    if (user) {
      return (
        <Redirect to="/" />
      )
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/" />
      )
    }

    return (
      <div className="ui container">
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="email" component={this.renderInput} label="Enter Email" />
          <Field name="password" component={this.renderInput} label="Enter password" />
          <button className="ui button primary">Submit</button>
        </form>
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

  return errors;
}

export default reduxForm({
  form: 'loginForm',
  validate
})(Login);

