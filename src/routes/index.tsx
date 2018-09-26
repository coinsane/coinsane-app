import React from 'react';
import { Overlay, Scene, Stack, Modal } from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import DefaultProps from 'src/constants/navigation';

import Forgot from 'src/screens/Forgot';
import SignUp from 'src/screens/SignUp';
import SignIn from 'src/screens/SignIn';
import Settings from 'src/screens/Settings';


import Drawer from 'src/components/Drawer';

import CoinsContainer from 'src/containers/Coins';
import CoinComponent from 'src/components/Coin/Coin.component';

import PortfoliosContainer from 'src/containers/Portfolios';
import Portfolios from 'src/screens/Portfolios';

import CoinsaneList from 'src/components/_Organisms/CoinsaneList/CoinsaneList.organism';

import CreateNewTransaction from 'src/components/CreateNewTransaction/CreateNewTransaction.component';

import PortfolioSettingsComponent from 'src/components/PortfolioSettings/PortfolioSettings.component';
import CreatePortfolioComponent from 'src/components/CreatePortfolio/CreatePortfolio.component';

import SettingsContainer from 'src/containers/Settings';

import MarketContainer from 'src/containers/Market';
import MarketComponent from 'src/components/Market/Market.component';

import ErrorModal from 'src/components/modal/Error.component';
import PageComponent from 'src/components/Page/Page.component';


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
            Layout={PortfolioSettingsComponent}
          />
          <Scene
            key="createPortfolio"
            component={PortfoliosContainer}
            Layout={CreatePortfolioComponent}
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
            Layout={MarketComponent}
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
        Layout={CoinComponent}
      />
    </Overlay>
    <Scene
      key="error"
      component={ErrorModal}
    />
    <Scene
      key="page"
      component={PageComponent}
    />
    <Scene
      key="selector"
      component={CoinsaneList}
    />
    <Scene
      key="createNewTransaction"
      component={CreateNewTransaction}
    />
  </Modal>
);

export default Index;
