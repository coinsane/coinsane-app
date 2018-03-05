import React from 'react';
import { StatusBar, Platform, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

import Routes from './routes/index';
import Loading from './components/Loading/Loading.component';

import { setToken } from '../lib/utils';

setToken();

import { Firebase } from '../lib/firebase';
Firebase.auth().signInAnonymously();

const RouterWithRedux = connect()(Router);

const getSceneStyle = () => ({
  backgroundColor: '#151022'
});

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate
      loading={<Loading />}
      persistor={persistor}
    >
      <StyleProvider style={getTheme(theme)}>
        <RouterWithRedux getSceneStyle={getSceneStyle}>
          {Routes}
        </RouterWithRedux>
      </StyleProvider>
    </PersistGate>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default Root;
