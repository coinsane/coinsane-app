import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateNothing from '../components/TemplateNothing';
import TemplateSidebar from '../components/TemplateSidebar';

// Routes
import Home from '../components/Home';

import CoinsContainer from '../../containers/Coins';
import CoinsComponent from '../components/Coins';
import CoinViewComponent from '../components/Coin';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import Error from '../components/Error';

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateSidebar>
          <Home {...props} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/sign-up"
      render={props => (
        <TemplateNothing>
          <SignUpContainer {...props} Layout={SignUpComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/login"
      render={props => (
        <TemplateNothing>
          <LoginContainer {...props} Layout={LoginComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/forgot-password"
      render={props => (
        <TemplateNothing>
          <ForgotPasswordContainer {...props} Layout={ForgotPasswordComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/update-profile"
      render={props => (
        <TemplateSidebar>
          <UpdateProfileContainer {...props} Layout={UpdateProfileComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/coins"
      render={props => (
        <TemplateSidebar>
          <CoinsContainer {...props} Layout={CoinsComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/coin/:id"
      render={props => (
        <TemplateSidebar>
          <CoinsContainer {...props} Layout={CoinViewComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      render={props => (
        <TemplateSidebar>
          <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
        </TemplateSidebar>
      )}
    />
  </Switch>
);

export default Index;
