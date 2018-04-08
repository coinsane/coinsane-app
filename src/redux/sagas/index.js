import { all } from 'redux-saga/effects';
import transactionsSaga from './transactions';
import fetchAvaliableMarkets from './markets';
import coinsSaga from './coins';
import currenciesSaga from './currencies';

export default function* rootSaga() {
  yield all([
    ...transactionsSaga,
    ...fetchAvaliableMarkets,
    ...coinsSaga,
    ...currenciesSaga
  ]);
}