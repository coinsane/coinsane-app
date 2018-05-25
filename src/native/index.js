import React, { Component } from 'react';
import { StatusBar, Platform, DeviceEventEmitter, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StyleProvider } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import QuickActions from 'react-native-quick-actions';
import axios from 'axios/index';

import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';
import { colors } from './styles';

import Routes from './routes/index';
import Loading from './components/Loading/Loading.component';

import Config from '../constants/config';
import { getToken } from '../redux/state/auth/auth.actioncreators';


axios.defaults.baseURL = Config.apiUri;

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
    this.props.getToken();
  };

  componentDidMount() {
    SplashScreen.hide();
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    console.log(event.url);
    // const route = e.url.replace(/.*?:\/\//g, '');
    // do something with the url, in our case navigate(route)
  };

  render() {
    const { store, persistor, auth } = this.props;
    return (
      !auth.token ? <Loading /> :
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <StyleProvider style={getTheme(theme)}>
            <RouterWithRedux getSceneStyle={() => ({ backgroundColor: colors.bgPrimary })}>
              {Routes}
            </RouterWithRedux>
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
