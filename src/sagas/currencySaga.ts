import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { currency as currencyActions } from 'src/actions';

import { api } from 'src/services';

export function* fetchAvailableCurrencies (action: ReturnType<typeof currencyActions.getAvailableCurrencies>) {
  if (action.payload.q) yield delay(2000);
  try {
    const response = yield call(api.currencies.fetchAvailableCurrencies, action.payload);
    yield put({
      type: currencyActions.ActionTypes.GET_AVAILABLE_CURRENCIES_SUCCESS,
      payload: {
        list: response.data.response.result,
        ...action.payload,
      },
    });
  } catch (e) {
    yield put({ type: currencyActions.ActionTypes.GET_AVAILABLE_CURRENCIES_ERROR, payload: e });
  }
}

export function* selectCurrency (action) {
  try {
    yield put({
      payload: action.payload,
      type: currencyActions.ActionTypes.SELECT_CURRENCY_SUCCESS,
    });
  } catch (error) {
    yield put({
      error,
      type: currencyActions.ActionTypes.SELECT_CURRENCY_ERROR,
    });
  }
}

// for rootSaga
export default [
  takeLatest(currencyActions.ActionTypes.GET_AVAILABLE_CURRENCIES, fetchAvailableCurrencies),
  takeLatest(currencyActions.ActionTypes.SELECT_CURRENCY, selectCurrency),
];
