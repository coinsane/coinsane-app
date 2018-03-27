import { all } from 'redux-saga/effects';
import transactionsSaga from './transactions';
import fetchAvaliableMarkets from './markets';

export default function* rootSaga() {
  yield all([
    ...transactionsSaga,
    ...fetchAvaliableMarkets
  ]);
}