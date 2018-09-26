import { StyleProvider } from 'native-base';
import React from 'react';
import {
  DeviceEventEmitter,
  Linking,
  NetInfo,
  Platform,
  YellowBox,
} from 'react-native';
import QuickActions from 'react-native-quick-actions';
import OneSignal from 'react-native-onesignal';
import { Router } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { api } from 'src/services';

import { base } from 'src/styles';

import getTheme from 'src/components/NativeBase/components';
import theme from 'src/components/NativeBase/variables/commonColor';

import { authActions, statusActions } from 'src/actions';
import Routes from 'src/routes';

import AuthProvider from 'src/components/AuthProvider/AuthProvider.component';
import { Loading } from 'src/components/Base';

import Config from 'src/constants/config';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RNQuickActionManager',
]);

DeviceEventEmitter.addListener('quickActionShortcut', console.log);

QuickActions.setShortcutItems([
  {
    icon: 'Add',
    subtitle: '',
    title: 'Add Transaction',
    type: 'Transactions',
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
  componentDidMount () {
    const {
      networkStatusChange,
    } = this.props;

    api.init();

    SplashScreen.hide();

    OneSignal.init(Config.oneSignalAppId, {
      kOSSettingsKeyAutoPrompt: false,
    });

    // get initial and set listener for network status
    this.getConnectionInfo().then(networkStatusChange);

    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event: any) => {
    // console.log(event.url);
    // const route = e.url.replace(/.*?:\/\//g, '');
    // do something with the url, in our case navigate(route)
  };

  render () {
    const {
      store,
      persistor,
      getToken,
      token = '',
      network = false,
    } = this.props;
    const reconnect = () => getToken();
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <StyleProvider style={getTheme(theme)}>
            <AuthProvider
              getToken={getToken}
              token={token}
              network={network}
              reconnect={reconnect}
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

  private getConnectionInfo (): Promise<boolean> {
    const {
      getToken,
      networkStatusChange,
      token,
    } = this.props;
    if (Platform.OS === 'ios') {
      return new Promise((resolve) => {
        const handleFirstConnectivityChangeIOS = (isConnected: boolean) => {
          NetInfo.isConnected.removeEventListener(
            'connectionChange',
            handleFirstConnectivityChangeIOS,
          );
          networkStatusChange(isConnected);
          if (!token && isConnected) getToken();
          resolve(isConnected);
        };
        NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
      });
    }

    return NetInfo.isConnected.fetch().then(networkStatusChange);
  }
}

const mapStateToProps = (state: any) => ({
  network: state.status.network,
  token: state.auth.token,
});

const mapDispatchToProps = {
  ...authActions,
  ...statusActions,
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Root);
