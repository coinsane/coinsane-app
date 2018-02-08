import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Drawer, Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import { Header, Left, Body, Right, Button, Title } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import DrawerContent from '../components/DrawerContent';

import CoinsContainer from '../../containers/Coins';
import CoinsComponent from '../components/Coins';
import CoinViewComponent from '../components/Coin';

import PortfoliosContainer from '../../containers/Portfolios';
import PortfoliosComponent from '../components/Portfolios';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import WatchlistComponent from '../components/Watchlist';
import MarketComponent from '../components/Market';



const Index = (
  <Drawer
    contentComponent={DrawerContent}
    drawerWidth={300}
  >
    <Stack
      hideNavBar
      key="coins"
      {...DefaultProps.navbarProps}
    >
      <Scene key="coins"
        component={CoinsContainer}
        Layout={CoinsComponent}
       />
      <Scene
        back
        key="portfolioSelect"
        component={PortfoliosContainer}
        Layout={PortfoliosComponent}
      />
    </Stack>

    <Stack
      key="watchlist"
      {...DefaultProps.navbarProps}
    >
      <Scene key="watchlist" component={WatchlistComponent} />
    </Stack>

    <Stack
      key="market"
      {...DefaultProps.navbarProps}
    >
      <Scene key="market" component={MarketComponent} />
    </Stack>

    <Stack
      key="profile"
      {...DefaultProps.navbarProps}
    >
      <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
      <Scene
        back
        key="signUp"
        title="SIGN UP"
        {...DefaultProps.navbarProps}
        component={SignUpContainer}
        Layout={SignUpComponent}
      />
      <Scene
        back
        key="login"
        title="LOGIN"
        {...DefaultProps.navbarProps}
        component={LoginContainer}
        Layout={LoginComponent}
      />
      <Scene
        back
        key="forgotPassword"
        title="FORGOT PASSWORD"
        {...DefaultProps.navbarProps}
        component={ForgotPasswordContainer}
        Layout={ForgotPasswordComponent}
      />
      <Scene
        back
        key="updateProfile"
        title="UPDATE PROFILE"
        {...DefaultProps.navbarProps}
        component={UpdateProfileContainer}
        Layout={UpdateProfileComponent}
      />
    </Stack>

    <Scene
      back
      clone
      key="coin"
      {...DefaultProps.navbarProps}
      component={CoinsContainer}
      Layout={CoinViewComponent}
    />
  </Drawer>
);

const styles = StyleSheet.create({
  menu: {
    color: '#5956CB',
  },
})

export default Index;
