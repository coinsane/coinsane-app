import { takeLatest, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import api from '../../api';
import {
  GET_AVAILABLE_CURRENCIES,
  GET_AVAILABLE_CURRENCIES_SUCCESS,
  SELECT_CURRENCY,
  SELECT_CURRENCY_SUCCESS,
  SELECT_CURRENCY_ERROR,
} from '../../redux/actions/action.types';

export function* fetchAvailableCurrencies(action) {
  if (action.payload.q) yield delay(2000);
  const response = yield call(api.currencies.fetchAvailableCurrencies, action.payload);
  yield put({
    type: GET_AVAILABLE_CURRENCIES_SUCCESS,
    payload: {
      list: response.data.response.result,
      ...action.payload,
    },
  });
}

export function* selectCurrency(action) {
  try {
    yield put({ type: SELECT_CURRENCY_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: SELECT_CURRENCY_ERROR, error });
  }
}

// for rootSaga
export default [
  takeLatest(GET_AVAILABLE_CURRENCIES, fetchAvailableCurrencies),
  takeLatest(SELECT_CURRENCY, selectCurrency),
];
