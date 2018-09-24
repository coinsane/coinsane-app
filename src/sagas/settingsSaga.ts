import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  portfolio as portfolioActions,
  settings as settingsActions,
} from 'src/actions';
import { api } from 'src/services';

import selectors from './selectors';

export function* updateDefaultCurrencies (action) {
  try {
    yield put({
      payload: action.payload.currencies,
      type: settingsActions.ActionTypes.UPDATE_CURRENCIES_SUCCESS,
    });
    if (action.payload.type === 'add') {
      yield call(api.settings.addCurrency, action.payload.currencyId);
      yield put({ type: portfolioActions.ActionTypes.UPDATE_PORTFOLIOS, payload: {} });
    } else if (action.payload.type === 'remove') {
      yield call(api.settings.removeCurrency, action.payload.currencyId);
      const symbol = yield select(selectors.getSymbol);
      if (!Object.keys(action.payload.currencies).includes(symbol)) {
        yield put({
          payload: Object.keys(action.payload.currencies)[0],
          type: settingsActions.ActionTypes.SELECT_CURRENCY,
        });
      }
    }
  } catch (error) {
    yield put({
      error,
      type: settingsActions.ActionTypes.UPDATE_CURRENCIES_ERROR,
    });
  }
}

export default [
  takeLatest(settingsActions.ActionTypes.UPDATE_CURRENCIES, updateDefaultCurrencies),
];
