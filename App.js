import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';

import { Firebase } from './src/lib/firebase';

Firebase.auth().signInAnonymously();

const { persistor, store } = configureStore();

export default function App() {
  return <Root store={store} persistor={persistor} />;
}
