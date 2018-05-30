import React from 'react';
import { Overlay, Scene, Tabs, Stack, Modal, Lightbox } from 'react-native-router-flux';
import { View } from 'native-base';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import DefaultProps from '../constants/navigation';

import NavigationDrawer from '../components/NavigationDrawer/NavigationDrawer.component';

import CoinsContainer from '../../containers/Coins';
import CoinComponent from '../components/Coin/Coin.component';

import PortfoliosContainer from '../../containers/Portfolios';
import PortfoliosComponent from '../components/Portfolios/Portfolios.component';
import PortfoliosModal from '../components/modal/Portfolios.component';

import CoinsaneList from '../components/_Organisms/CoinsaneList/CoinsaneList.organism';

import CreateNewTransaction from '../components/CreateNewTransaction/CreateNewTransaction.component';

import PortfolioSettingsComponent from '../components/PortfolioSettings/PortfolioSettings.component';
import CreatePortfolioComponent from '../components/CreatePortfolio/CreatePortfolio.component';

import SettingsContainer from '../../containers/Settings';
import SettingsComponent from '../components/Settings/Settings.component';

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
              Layout={SettingsComponent}
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
      key="portfolioSelect"
      component={PortfoliosContainer}
      Layout={PortfoliosModal}
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
