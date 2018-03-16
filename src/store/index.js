/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { api } from '../redux/middleware/api';
import throttle from '../redux/middleware/throttle';
import { coinsActionsFlow } from '../redux/middleware/coins';
import reducers from '../reducers';

// Redux Persist config
const config = {
  key: 'root',
  storage,
  blacklist: ['navigation','status','coins','portfolios'], // TODO remove for production
};

const reducer = persistCombineReducers(config, reducers);

const logger = createLogger();

const middleware = [thunk, throttle, api, coinsActionsFlow];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(
    store,
    null,
    () => { store.getState(); },
  );

  return { persistor, store };
};

export default configureStore;
