import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Drawer, Overlay, Scene, Tabs, Stack, Actions, ActionConst, Modal, Lightbox } from 'react-native-router-flux';
import { Header, Left, Body, Right, Button, Title, View } from 'native-base';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import NavigationDrawer from '../components/NavigationDrawer';
import DrawerContent from '../components/DrawerContent';

import CoinsContainer from '../../containers/Coins';
import CoinsComponent from '../components/Coins';
import CoinViewComponent from '../components/Coin';

import PortfoliosContainer from '../../containers/Portfolios';
import PortfoliosModal from '../components/modal/Portfolios';

import PortfolioSettingsComponent from '../components/PortfolioSettings';

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

import MarketContainer from '../../containers/Market';
import MarketComponent from '../components/Market';

import ErrorModal from '../components/modal/Error';


const Index = (
  <Modal key="modal"
    hideNavBar
    transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
  >
    <Overlay key="overlay" contentComponent={NavigationDrawer}>
      <Lightbox key="lightbox">
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
               key="portfolioSettings"
               component={CoinsContainer}
               Layout={PortfolioSettingsComponent}
             />
          </Stack>

          <Stack
            hideNavBar
            key="watchlist"
            {...DefaultProps.navbarProps}
          >
            <Scene key="watchlist" component={MarketContainer} Layout={WatchlistComponent} />
          </Stack>

          <Stack
            hideNavBar
            key="market"
            {...DefaultProps.navbarProps}
          >
            <Scene key="market" component={MarketContainer} Layout={MarketComponent} />
          </Stack>

          <Stack
            hideNavBar
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
      </Lightbox>

      <Scene
        back
        clone
        key="coin"
        {...DefaultProps.navbarProps}
        component={CoinsContainer}
        Layout={CoinViewComponent}
      />
    </Overlay>
    <Scene key="error" component={ErrorModal} />
    <Scene
      key="portfolioSelect"
      component={PortfoliosContainer}
      Layout={PortfoliosModal}
    />
  </Modal>
);

export default Index;
