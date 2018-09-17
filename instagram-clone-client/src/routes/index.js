import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './home';
import Login from './login';
import decode from 'jwt-decode';
import { ContextStore } from '../store';

import 'semantic-ui-css/semantic.min.css';
import '../css/main.css';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  let isValid = true;
  try {
    isValid = decode(token);
  } catch (e) {
    return false;
  }
  return isValid;
};

const MyRoute = ({ component, ...rest }) =>
  isAuthenticated() ? (
    <Route {...rest} render={props => <ContextStore comp={component} />} />
  ) : (
    <Redirect to="/login" />
  );

const Logout = () => {
  localStorage.removeItem('token');
  return <Redirect to="/login" />;
};

export default () => (
  <Router>
    <Switch>
      <MyRoute path="/" exact component={<Home />} />
      {/* <Route
        exact
        path="/"
        render={props => <ContextStore comp={<Home />} />}
      /> */}
      <Route path="/login" exact component={Login} />
      <Route path="/logout" exact component={Logout} />
    </Switch>
  </Router>
);
