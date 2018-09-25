import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { currenciesActions } from 'src/actions';

import { api } from 'src/services';

export function* fetchAvailableCurrencies (action: ReturnType<typeof currenciesActions.getAvailableCurrencies>) {
  if (action.payload.q) yield delay(2000);
  try {
    const response = yield call(api.currencies.fetchAvailableCurrencies, action.payload);
    yield put({
      type: currenciesActions.ActionTypes.GET_AVAILABLE_CURRENCIES_SUCCESS,
      payload: {
        list: response.data.response.result,
        ...action.payload,
      },
    });
  } catch (e) {
    yield put({ type: currenciesActions.ActionTypes.GET_AVAILABLE_CURRENCIES_ERROR, payload: e });
  }
}

export function* selectCurrency (action) {
  try {
    yield put({
      payload: action.payload,
      type: currenciesActions.ActionTypes.SELECT_CURRENCY_SUCCESS,
    });
  } catch (error) {
    yield put({
      error,
      type: currenciesActions.ActionTypes.SELECT_CURRENCY_ERROR,
    });
  }
}

// for rootSaga
export default [
  takeLatest(currenciesActions.ActionTypes.GET_AVAILABLE_CURRENCIES, fetchAvailableCurrencies),
  takeLatest(currenciesActions.ActionTypes.SELECT_CURRENCY, selectCurrency),
];
