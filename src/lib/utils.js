import { Firebase } from './firebase';

import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Config from '../constants/config';

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
}

export const getUID = async () => new Promise((resolve, reject) => {
  if (Firebase === null) return reject();
  if (Firebase.auth().currentUser) return resolve(Firebase.auth().currentUser.uid);
  Firebase.auth().onAuthStateChanged(user => user ? resolve(user.uid) : reject());
});

export const fetch = (data) => new Promise(async (resolve, reject) => {
  const instance = axios.create({
    baseURL: Config.apiUri
  });

  const token = await AsyncStorage.getItem('token');
  if (token !== null) {
    instance.defaults.headers.common['Authorization'] = `${Config.appName} token=${token}`;
    resolve(instance)
  } else {
    instance.get('/auth/getToken').then(({ success, result }) => {
      if (success) {
        instance.defaults.headers.common['Authorization'] = `${Config.appName} token=${result.token}`;
      }
    });
  }
});
