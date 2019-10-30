import "../css/app.css";
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Chat from "./Chat";
import Landing from "./Landing";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import ChatBox from "./ChatBox";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/chat" component={Chat} />
            <PrivateRoute exact path="/chat/:id" component={ChatBox} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
