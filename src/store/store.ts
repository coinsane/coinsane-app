import { applyMiddleware, createStore } from 'redux';
import { PersistPartial, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createSagaMiddleware from 'redux-saga';

import IRootState from 'src/models';
import rootReducer from 'src/reducers';
import rootSaga from 'src/redux/sagas';
import { composeEnhancers } from './utils';

// Redux Persist config
const persistConfig = {
  storage,
  blacklist: ['navigation', 'status'],
  key: 'root',
};

const persistedReducer = persistReducer<IRootState & PersistPartial, any>(
  persistConfig,
  rootReducer,
);

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const configureStore = (initialState?: IRootState) => {
  const store = createStore(
    persistedReducer,
    initialState!,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(
    store,
    {},
    () => store.getState(),
  );

  return { persistor, store };
};

export default configureStore;
