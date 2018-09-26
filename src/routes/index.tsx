import React from 'react';
import { Overlay, Scene, Stack, Modal } from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import DefaultProps from 'src/constants/navigation';

import Coin from 'src/screens/Coin';
import CreateNewTransaction from 'src/screens/CreateNewTransaction';
import CreatePortfolio from 'src/screens/CreatePortfolio';
import Forgot from 'src/screens/Forgot';
import List from 'src/screens/List';
import Market from 'src/screens/Market';
import Page from 'src/screens/Page';
import Portfolios from 'src/screens/Portfolios';
import PortfolioSettings from 'src/screens/PortfolioSettings';
import Settings from 'src/screens/Settings';
import SignIn from 'src/screens/SignIn';
import SignUp from 'src/screens/SignUp';

import Drawer from 'src/components/Drawer';

import CoinsContainer from 'src/containers/Coins';
import MarketContainer from 'src/containers/Market';
import PortfoliosContainer from 'src/containers/Portfolios';
import SettingsContainer from 'src/containers/Settings';


import ErrorModal from 'src/components/modal/Error.component';


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
      contentComponent={Drawer}
    >
      <Stack
        key="sections"
        panHandlers={null}
        transitionConfig={() => ({
          screenInterpolator: CardStackStyleInterpolator.forFade,
        })}
      >
        <Stack
          key="coins"
          hideNavBar
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="portfolios"
            component={PortfoliosContainer}
            Layout={Portfolios}
          />
          <Scene
            key="portfolioSettings"
            component={PortfoliosContainer}
            Layout={PortfolioSettings}
          />
          <Scene
            key="createPortfolio"
            component={PortfoliosContainer}
            Layout={CreatePortfolio}
          />
        </Stack>

        <Stack
          key="market"
          hideNavBar
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="market"
            component={MarketContainer}
            Layout={Market}
          />
        </Stack>

        <Stack
          key="settings"
          hideNavBar
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="settings"
            component={SettingsContainer}
            Layout={Settings}
          />
          <Scene
            key="createAccount"
            component={SignUp}
          />
          <Scene
            key="signIn"
            component={SignIn}
          />
          <Scene
            key="forgot"
            component={Forgot}
          />
        </Stack>
      </Stack>

      <Scene
        back
        clone
        key="coin"
        {...DefaultProps.navbarProps}
        component={CoinsContainer}
        Layout={Coin}
      />
    </Overlay>
    <Scene
      key="error"
      component={ErrorModal}
    />
    <Scene
      key="page"
      component={Page}
    />
    <Scene
      key="selector"
      component={List}
    />
    <Scene
      key="createNewTransaction"
      component={CreateNewTransaction}
    />
  </Modal>
);

export default Index;
