import { takeLatest, put, call, select } from 'redux-saga/effects';
import selectors from '../selectors';
import api from '../../api';
import {
  UPDATE_CURRENCIES_SUCCESS,
  UPDATE_CURRENCIES_ERROR,
  UPDATE_CURRENCIES,
  UPDATE_PORTFOLIOS,
  SELECT_CURRENCY,
} from '../actions/action.types';

export function* updateDefaultCurrencies(action) {
  try {
    yield put({ type: UPDATE_CURRENCIES_SUCCESS, payload: action.payload.currencies });
    if (action.payload.type === 'add') {
      yield call(api.settings.addCurrency, action.payload.currencyId);
      yield put({ type: UPDATE_PORTFOLIOS, payload: {} });
    } else if (action.payload.type === 'remove') {
      yield call(api.settings.removeCurrency, action.payload.currencyId);
      const symbol = yield select(selectors.getSymbol);
      if (!Object.keys(action.payload.currencies).includes(symbol)) {
        yield put({ type: SELECT_CURRENCY, payload: Object.keys(action.payload.currencies)[0] });
      }
    }
  } catch (error) {
    yield put({ type: UPDATE_CURRENCIES_ERROR, error });
  }
}

// for rootSaga
export default [
  takeLatest(UPDATE_CURRENCIES, updateDefaultCurrencies),
];
