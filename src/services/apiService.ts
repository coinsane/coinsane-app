import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

import config from 'src/constants/config';
import methods from './api';

const init = () => {
  const version = DeviceInfo.getVersion();
  axios.defaults.baseURL = config.apiUri;
  axios.defaults.headers.common['X-Coinsane-App-Version'] = version;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

export default {
  init,
  ...methods,
};
