import React from 'react';
import Root from './src';
import configureStore from './src/store';

const { persistor, store } = configureStore();

class App extends React.PureComponent {
  render () {
    return <Root store={store} persistor={persistor} />;
  }
}

export default App;
