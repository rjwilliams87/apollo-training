import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Login } from './login';
import { Signup } from './signup';
import { Dashboard } from './dashboard';
import { Pet } from './pet';
import { CreatePet } from './createPet';

export const App = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/login" />} key="base" />,
    <Route exact path="/login" component={Login} key="login-component" />
    <Route exact path="/signup" component={Signup} key="signup-component" />
    <Route
      exact
      path="/dashboard/:id"
      component={Dashboard}
      key="dashboard-component"
    />
    <Route exact path="/pet/:id" component={Pet} key="pet-component" />
    <Route
      exact
      path="/pet/new/:userId"
      component={CreatePet}
      key="create-pet-component"
    />
  </Switch>
);
