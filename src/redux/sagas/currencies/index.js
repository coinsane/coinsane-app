import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../../api';
import {
  GET_AVAILABLE_CURRENCIES,
  GET_AVAILABLE_CURRENCIES_SUCCESS,
  SELECT_CURRENCY,
  SELECT_CURRENCY_SUCCESS,
  SELECT_CURRENCY_ERROR,
} from '../../../redux/actions/action.types';

export function* fetchAvailableCurrencies(action) {
  const response = yield call(api.currencies.fetchAvailableCurrencies, action.payload.limit || 10);
  yield put({ type: GET_AVAILABLE_CURRENCIES_SUCCESS, payload: response.data.response.result });
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
