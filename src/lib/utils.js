import { Firebase } from './firebase';

export const getUID = async () => new Promise((resolve, reject) => {
  if (Firebase === null) return reject();
  if (Firebase.auth().currentUser) return resolve(Firebase.auth().currentUser.uid);
  Firebase.auth().onAuthStateChanged(user => user ? resolve(user.uid) : reject());
});
