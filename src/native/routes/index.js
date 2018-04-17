import React from 'react';
import { Overlay, Scene, Tabs, Stack, Modal, Lightbox } from 'react-native-router-flux';
import { View } from 'native-base';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import DefaultProps from '../constants/navigation';

import NavigationDrawer from '../components/NavigationDrawer/NavigationDrawer.component';

import CoinsContainer from '../../containers/Coins';
import CoinsComponent from '../components/Coins/Coins.component';
import CoinViewComponent from '../components/Coin/Coin.component';

import PortfoliosContainer from '../../containers/Portfolios';
import PortfoliosModal from '../components/modal/Portfolios.component';

import Selector from '../components/_Organisms/CoinsaneList/CoinsaneList.organism';

import CreateNewTransaction from '../components/CreateNewTransaction/CreateNewTransaction.component';

import PortfolioSettingsComponent from '../components/PortfolioSettings/PortfolioSettings.component';
import CreatePortfolioComponent from '../components/CreatePortfolio/CreatePortfolio.component';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp/SignUp.component';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login/Login.component';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword/ForgotPassword.component';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile/UpdateProfile.component';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile/Profile.component';

import WatchlistComponent from '../components/Watchlist/Watchlist.component';

import MarketContainer from '../../containers/Market';
import MarketComponent from '../components/Market/Market.component';

import ErrorModal from '../components/modal/Error.component';


const Index = (
  <Modal
    key="modal"
    hideNavBar
    transitionConfig={() => ({
      screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid,
    })}
  >
    <Overlay
      key="overlay"
      contentComponent={NavigationDrawer}
    >
      <Lightbox key="lightbox">
        <Tabs
          key="tabbar"
          swipeEnabled={false}
          animationEnabled={false}
          tabBarComponent={() => <View />}
        >
          <Stack
            key="coins"
            hideNavBar
            {...DefaultProps.navbarProps}
          >
            <Scene
              key="coins"
              component={CoinsContainer}
              Layout={CoinsComponent}
            />
            <Scene
              key="portfolioSettings"
              component={CoinsContainer}
              Layout={PortfolioSettingsComponent}
            />
            <Scene
              key="createPortfolio"
              component={CoinsContainer}
              Layout={CreatePortfolioComponent}
            />
            <Scene
              key="createNewTransaction"
              component={CreateNewTransaction}
            />
            <Scene
              key="selector"
              component={Selector}
            />
          </Stack>

          <Stack
            key="watchlist"
            hideNavBar
            {...DefaultProps.navbarProps}
          >
            <Scene key="watchlist" component={MarketContainer} Layout={WatchlistComponent} />
          </Stack>

          <Stack
            key="market"
            hideNavBar
            {...DefaultProps.navbarProps}
          >
            <Scene
              key="market"
              component={MarketContainer}
              Layout={MarketComponent}
            />
          </Stack>

          <Stack
            key="profile"
            hideNavBar
            {...DefaultProps.navbarProps}
          >
            <Scene
              key="profileHome"
              component={MemberContainer}
              Layout={ProfileComponent}
            />
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
    <Scene
      key="error"
      component={ErrorModal}
    />
    <Scene
      key="portfolioSelect"
      component={PortfoliosContainer}
      Layout={PortfoliosModal}
    />
  </Modal>
);

export default Index;
