import { all } from 'redux-saga/effects';
import transactionsSaga from './transactions';
import fetchAvaliableMarkets from './markets';
import coinsSage from './coins';

export default function* rootSaga() {
  yield all([
    ...transactionsSaga,
    ...fetchAvaliableMarkets,
    ...coinsSage
  ]);
}