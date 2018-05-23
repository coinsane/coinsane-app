import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Config from '../constants/config';

export const setTokenHeader = async (token) => {
  axios.defaults.baseURL = Config.apiUri;
  axios.defaults.headers.common['Authorization'] = `${Config.appName} token=${token}`;
  return true;
};

export const setToken = async () => {
  axios.defaults.baseURL = Config.apiUri;
  const token = await AsyncStorage.getItem('token');

  if (token !== null) {
    axios.defaults.headers.common['Authorization'] = `${Config.appName} token=${token}`;
  } else {
    const response = await axios.get('/auth/getToken');
    if (response.data && response.data.success) {
      AsyncStorage.setItem('token', response.data.result.token);
      axios.defaults.headers.common['Authorization'] = `${Config.appName} token=${response.data.result.token}`;
    }
  }
};


/*
* Currency Formatting (prefix or suffix)
* */
export const cFormat = (value = 0, symbol = '') => {
  return symbol.length > 1 ? `${value} ${symbol}` : `${symbol}${value}`;
};


/*
* Number Formatting
* */
export const nFormat = (num = 0, digits = 0, startFrom = 1) => {
  const si = [
    { value: 0, symbol: '' },
    // { value: 1E3, symbol: 'k' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'B' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'P' },
    { value: 1E18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const rx2 = /(\d)(?=(\d{3})+(?!\d))/g;
  let i;
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break;
    }
  }
  if (si[i].value < si[startFrom].value) {
    const numSplit = num.toString().split('.');
    if (numSplit.length === 1) return `${numSplit[0].replace(rx2, '$1,')}`;
    return `${numSplit[0].replace(rx2, '$1,')}.${numSplit[1].slice(0, digits)}`;
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};


export const round = (amount, n) => Math.round(amount * (10 ** n)) / (10 ** n);
