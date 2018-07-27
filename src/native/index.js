import React, { Component } from 'react';
import { DeviceEventEmitter, Linking, YellowBox } from 'react-native';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StyleProvider } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import QuickActions from 'react-native-quick-actions';
import axios from 'axios/index';
import OneSignal from 'react-native-onesignal';

import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';
import { colors } from './styles';

import Routes from './routes';
import Loading from './components/Loading/Loading.component';
import AuthProvider from './components/AuthProvider/AuthProvider.component';
import { getToken } from '../redux/state/auth/auth.actioncreators';

import Config from '../constants/config';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

DeviceEventEmitter.addListener('quickActionShortcut', console.log);

QuickActions.setShortcutItems([
  {
    type: 'Transactions',
    title: 'Add Transaction',
    subtitle: '',
    icon: 'Add',
    userInfo: {
      url: 'coinsane://transaction',
    },
  },
]);

const RouterWithRedux = connect()(Router);

class Root extends Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
    getToken: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    axios.defaults.baseURL = Config.apiUri;
    OneSignal.init(Config.oneSignalAppId, {
      kOSSettingsKeyAutoPrompt: false,
    });
  }

  componentDidMount() {
    SplashScreen.hide();
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  getSceneStyle = () => ({
    backgroundColor: colors.bgPrimary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  });

  handleOpenURL = (event) => {
    console.log(event.url);
    // const route = e.url.replace(/.*?:\/\//g, '');
    // do something with the url, in our case navigate(route)
  };

  render() {
    const { store, persistor, auth } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <StyleProvider style={getTheme(theme)}>
            <AuthProvider getToken={this.props.getToken} auth={auth}>
              <RouterWithRedux getSceneStyle={this.getSceneStyle}>
                {Routes}
              </RouterWithRedux>
            </AuthProvider>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  getToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
