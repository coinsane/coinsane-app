import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';

import { Firebase } from './src/lib/firebase';

Firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log('errorCode', errorCode, errorMessage);
  // ...
});

const { persistor, store } = configureStore();

export default function App() {
  return <Root store={store} persistor={persistor} />;
}
