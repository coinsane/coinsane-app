import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Drawer, Overlay, Scene, Tabs, Stack, Actions, ActionConst, Lightbox } from 'react-native-router-flux';
import { Header, Left, Body, Right, Button, Title, View } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import NavigationDrawer from '../components/NavigationDrawer';
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
  <Overlay key="overlay" contentComponent={NavigationDrawer}>
    <Tabs key="tabbar" swipeEnabled={false} animationEnabled={false} tabBarComponent={() => <View/>}>
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
    </Tabs>

    <Scene
      back
      clone
      key="coin"
      {...DefaultProps.navbarProps}
      component={CoinsContainer}
      Layout={CoinViewComponent}
    />
  </Overlay>
);

const styles = StyleSheet.create({
  menu: {
    color: '#5956CB',
  },
})

export default Index;
