import { Firebase } from './firebase';
import Config from '../constants/config';

export const getUID = async () => new Promise((resolve, reject) => {
  if (Firebase === null) return reject();
  if (Firebase.auth().currentUser) return resolve(Firebase.auth().currentUser.uid);
  Firebase.auth().onAuthStateChanged(user => user ? resolve(user.uid) : reject());
});

export const fetch = (data) => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject('auth problem');
  const Authorization = `${Config.appName} token=${UID}`;

  console.log(`fetch === ${data}`)

  return fetch(`${Config.apiUri}${data}`, { headers: { Authorization } })
    .then(response => response.json())
});
