import { all } from 'redux-saga/effects';
import categoriesSaga from './categorySaga';
import coinsSaga from './coinSaga';
import currenciesSaga from './currencySaga';
import marketsSaga from './marketSaga';
import pagesSaga from './pageSaga';
import portfoliosSaga from './portfolioSaga';
import settingsSaga from './settingsSaga';
import transactionsSaga from './transactionSaga';
import usersSaga from './userSaga';

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
