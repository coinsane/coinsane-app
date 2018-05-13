import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StyleProvider } from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import Instabug from 'instabug-reactnative';

import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

import Routes from './routes/index';
import Loading from './components/Loading/Loading.component';

import { setToken } from '../lib/utils';

import { getToken } from '../redux/state/auth/auth.actioncreators';

setToken();

const RouterWithRedux = connect()(Router);

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

class Root extends Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
    auth: PropTypes.shape({}).isRequired,
    getToken: PropTypes.func.isRequired,
  };

  componentWillMount = () => {
    Instabug.isRunningLive((isLive) => {
      if (isLive) {
        Instabug.startWithToken('f3d5cf204e7acddad6825dc52594c21c', Instabug.invocationEvent.shake);
      } else {
        Instabug.startWithToken('eb8edc791b160f8f1ba74fa4fbf0786f', Instabug.invocationEvent.screenshot);
      }
    });
    this.props.getToken();
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  getSceneStyle = () => ({ backgroundColor: '#151022' });

  render() {
    const { store, persistor, auth } = this.props;
    return (
      !auth.token ?
        <Loading /> :
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <StyleProvider style={getTheme(theme)}>
              <RouterWithRedux getSceneStyle={this.getSceneStyle}>
                {Routes}
              </RouterWithRedux>
            </StyleProvider>
          </PersistGate>
        </Provider>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth || {},
});

const mapDispatchToProps = {
  getToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
