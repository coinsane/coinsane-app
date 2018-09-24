import React from 'react';
import { DeviceEventEmitter, Linking, YellowBox, NetInfo, Platform } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { StyleProvider } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import { PersistGate } from 'redux-persist/es/integration/react';
import QuickActions from 'react-native-quick-actions';
import OneSignal from 'react-native-onesignal';


import { base } from 'src/native/styles';

import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

import Routes from 'src/native/routes';

import { Loading } from 'src/native/components/Base';
import AuthProvider from 'src/native/components/AuthProvider/AuthProvider.component';
import { auth, status } from 'src/redux/actions';

import Config from '../constants/config';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RNQuickActionManager',
]);

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

interface IProps {
  store: any;
  persistor: any;
  getToken: () => void;
  networkStatusChange: (isConnected: boolean) => boolean;
  token?: string;
  network?: boolean;
}

class Root extends React.Component<IProps> {
  componentWillMount() {
    axios.defaults.baseURL = Config.apiUri;
  }

  componentDidMount() {
    const {
      networkStatusChange,
    } = this.props;

    SplashScreen.hide();

    OneSignal.init(Config.oneSignalAppId, {
      kOSSettingsKeyAutoPrompt: false,
    });

    // get initial and set listener for network status
    this.getConnectionInfo().then(networkStatusChange);

    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  private getConnectionInfo(): Promise<boolean> {
    const {
      getToken,
      networkStatusChange,
      token,
    } = this.props;
    if (Platform.OS === 'ios') {
      return new Promise((resolve) => {
        const handleFirstConnectivityChangeIOS = (isConnected: boolean) => {
          NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS);
          networkStatusChange(isConnected);
          if (!token && isConnected) getToken();
          resolve(isConnected);
        };
        NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
      });
    }

    return NetInfo.isConnected.fetch()
      .then(networkStatusChange);
  }

  handleOpenURL = (event: any) => {
    console.log(event.url);
    // const route = e.url.replace(/.*?:\/\//g, '');
    // do something with the url, in our case navigate(route)
  };

  render() {
    const {
      store,
      persistor,
      getToken,
      token = '',
      network = false,
    } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <StyleProvider style={getTheme(theme)}>
            <AuthProvider
              getToken={getToken}
              token={token}
              network={network}
              reconnect={() => getToken()}
            >
              <Router sceneStyle={base.scene}>
                {Routes}
              </Router>
            </AuthProvider>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  network: state.status.network,
});

const mapDispatchToProps = {
  ...auth,
  ...status,
};


export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Root);
