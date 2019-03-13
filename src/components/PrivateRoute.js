import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isSignedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>(
      isSignedIn ?  <Component {...props} /> : <Redirect to='/signup'/>  
    )}
  />
);

const mapStateToProps = state => {
  console.log(state);
  return {
    isSignedIn: state.auth.isSignedIn
  }
};

export default connect(mapStateToProps)(PrivateRoute); 