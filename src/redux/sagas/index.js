import { all } from 'redux-saga/effects';
import portfoliosSaga from './portfolios';
import transactionsSaga from './transactions';
import marketsSaga from './markets';
import coinsSaga from './coins';
import currenciesSaga from './currencies';
import usersSaga from './users';
import pagesSaga from './pages';
import categoriesSaga from './categories';

export default function* rootSaga() {
  yield all([
    ...portfoliosSaga,
    ...transactionsSaga,
    ...marketsSaga,
    ...coinsSaga,
    ...currenciesSaga,
    ...usersSaga,
    ...pagesSaga,
    ...categoriesSaga,
  ]);
}
