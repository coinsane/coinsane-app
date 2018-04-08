import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import api from '../../../api';
import {
  GET_AVALIABLE_CURRENCIES,
  GET_AVALIABLE_CURRENCIES_SUCCESS,
  GET_AVALIABLE_CURRENCIES_ERROR
} from '../../../redux/actions/action.types';

/////////////////////////////////////////////////////////////////

export function* fetchAvaliablecurrencies(action) {
  const response = yield call(api.currencies.fetchAvaliableCurrencies, action.payload.limit || 10);
  console.log(response);
  yield put({ type: GET_AVALIABLE_CURRENCIES_SUCCESS, payload: response.data.response.result });
}

// for rootSaga
export default [
  takeLatest(GET_AVALIABLE_CURRENCIES, fetchAvaliablecurrencies)
];