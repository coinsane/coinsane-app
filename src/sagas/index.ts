import { all } from 'redux-saga/effects';
import categoriesSaga from './categoriesSaga';
import coinsSaga from './coinsSaga';
import currenciesSaga from './currenciesSaga';
import marketsSaga from './marketsSaga';
import pagesSaga from './pagesSaga';
import portfoliosSaga from './portfoliosSaga';
import settingsSaga from './settingsSaga';
import transactionsSaga from './transactionsSaga';
import usersSaga from './usersSaga';

export default function* rootSaga() {
  yield all([
    ...categoriesSaga,
    ...coinsSaga,
    ...currenciesSaga,
    ...marketsSaga,
    ...pagesSaga,
    ...portfoliosSaga,
    ...settingsSaga,
    ...transactionsSaga,
    ...usersSaga,
  ]);
}
