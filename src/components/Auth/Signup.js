import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions';
import { connect } from 'react-redux';


class Signup extends Component {
  state = {
    redirect: false
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
      <div className={className} style={{ padding: '10px'}}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = ({ email, password }) => {
    const userObj = {
      email,
      password
    };

    this.props.registerUser(userObj, this.state.isSignedIn);
    this.setState({ redirect: true });
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

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

Signup = connect(mapStateToProps, { registerUser })(Signup);

export default reduxForm({
  form: 'signupForm',
  validate
})(Signup);


