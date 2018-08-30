import { takeLatest, put, call } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import api from '../../api';
import {
  UPDATE_CURRENCIES_SUCCESS,
  UPDATE_CURRENCIES_ERROR,
  UPDATE_CURRENCIES,
  UPDATE_PORTFOLIOS,
} from '../actions/action.types';

export function* updateDefaultCurrencies(action) {
  try {
    yield put({ type: UPDATE_CURRENCIES_SUCCESS, payload: action.payload.currencies });
    if (action.payload.type === 'add') {
      yield call(api.settings.addCurrency, action.payload.currencyId);
      yield put({ type: UPDATE_PORTFOLIOS, payload: {} });
    } else if (action.payload.type === 'remove') {
      yield call(api.settings.removeCurrency, action.payload.currencyId);
    }
  } catch (error) {
    yield put({ type: UPDATE_CURRENCIES_ERROR, error });
  }
}

// for rootSaga
export default [
  takeLatest(UPDATE_CURRENCIES, updateDefaultCurrencies),
];
