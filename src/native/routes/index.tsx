import React from 'react';
import { Overlay, Scene, Stack, Modal } from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';


import DefaultProps from 'src/native/constants/navigation';

import Forgot from 'src/native/screens/Forgot';
import SignUp from 'src/native/screens/SignUp';
import SignIn from 'src/native/screens/SignIn';
import Settings from 'src/native/screens/Settings';


import Drawer from 'src/native/components/Drawer';

import CoinsContainer from '../../containers/Coins';
import CoinComponent from '../components/Coin/Coin.component';

import PortfoliosContainer from '../../containers/Portfolios';
import PortfoliosComponent from '../components/Portfolios/Portfolios.component';

import CoinsaneList from '../components/_Organisms/CoinsaneList/CoinsaneList.organism';

import CreateNewTransaction from '../components/CreateNewTransaction/CreateNewTransaction.component';

import PortfolioSettingsComponent from '../components/PortfolioSettings/PortfolioSettings.component';
import CreatePortfolioComponent from '../components/CreatePortfolio/CreatePortfolio.component';

import SettingsContainer from '../../containers/Settings';

import MarketContainer from '../../containers/Market';
import MarketComponent from '../components/Market/Market.component';

import ErrorModal from '../components/modal/Error.component';
import PageComponent from '../components/Page/Page.component';


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
            Layout={PortfoliosComponent}
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
