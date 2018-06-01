import { put, call, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { round } from '../../../lib/utils';
import { inProcess } from '../../actions';
import api from '../../../api';
import selectors from '../../selectors';
import {
  ADD_TRANSACTION,
  GET_PRICE,
  GET_TRANSACTION_PRICE_SUCCESS,
  RECALCULATE,
  UPDATE_TRANSACTION,
  GET_AVAILABLE_TRANSACTIONS,
  GET_AVAILABLE_TRANSACTIONS_SUCCESS,
  UPDATE_PORTFOLIOS,
  UPDATE_COIN_TRANSACTIONS,
  UPDATE_TRANSACTIONS_ITEMS,
  GET_TRANSACTIONS_SUCCESS,
} from '../../actions/action.types';


/**
 * action.payload: { coinId, refreshing }
 */
export function* getTransactionsList(action) {
  const { coinId } = action.payload;
  if (coinId) {
    const response = yield call(api.coins.getTransactions, { coinId });
    const { transactions } = response.data.response;
    yield put({
      type: UPDATE_TRANSACTIONS_ITEMS,
      payload: { transactions },
    });
    yield put({
      type: UPDATE_COIN_TRANSACTIONS,
      payload: { coinId, transactions },
    });
    yield put({ type: GET_TRANSACTIONS_SUCCESS });
  }
}

/**
 * action.payload: {  }
 */
export function* addTransaction(action) {
  const response = yield call(api.coins.addTransaction, action.payload);
  const { transactions } = response.data.response.coin;
  yield put({
    type: GET_AVAILABLE_TRANSACTIONS_SUCCESS,
    payload: transactions,
  });
  const symbol = yield select(selectors.getSymbol);
  yield put({
    type: UPDATE_PORTFOLIOS,
    payload: { symbol },
  });
}

/**
 * action.payload: {  }
 */
export function* updateTransaction(action) {
  if (!(action.payload.coin || action.payload.currency)) return;
  const transaction = yield select(selectors.getTransaction);
  if (transaction.coinItem.symbol && transaction.currencyItem.code && transaction.date) {
    const response = yield call(api.coins.getPrice, {
      fsym: transaction.coinItem.symbol,
      tsyms: transaction.currencyItem.code,
      date: transaction.date,
    });
    yield put({
      type: GET_TRANSACTION_PRICE_SUCCESS,
      payload: response.data.data[transaction.currencyItem.code],
    });
    yield put({
      type: RECALCULATE,
      payload: 'price',
    });
  }
}

/**
 * action.payload: { fsym, tsyms, date }
 */
export function* getPrice(action) {
  const response = yield call(api.coins.getPrice, action.payload);
  yield put({
    type: GET_TRANSACTION_PRICE_SUCCESS,
    payload: response.data.data[action.payload.tsyms],
  });
  yield put({
    type: RECALCULATE,
    payload: 'price',
  });
}

/**
 * Calculate transaction amount, price, total
 */
export function* recalculate(action) {
  // Get inProcess -> transaction peace of state
  const transaction = yield select(selectors.getTransaction);

  if (action.payload === 'price') {
    if (+transaction.amount) {
      const total = transaction.price * transaction.amount;
      yield put(inProcess.updateProcessTransaction({ total: round(total, 8) }));
    } else if (+transaction.total) {
      const amount = transaction.total / transaction.price;
      yield put(inProcess.updateProcessTransaction({ amount: round(amount, 8) }));
    }
  }
  if (action.payload === 'total') {
    if (+transaction.total) {
      if (+transaction.amount) {
        const price = transaction.total / transaction.amount;
        yield put(inProcess.updateProcessTransaction({ price: round(price, 8) }));
      } else {
        const amount = transaction.total / transaction.price;
        yield put(inProcess.updateProcessTransaction({ amount: round(amount, 8) }));
      }
    }
  }
  if (action.payload === 'amount') {
    if (+transaction.price) {
      const total = transaction.price * transaction.amount;
      yield put(inProcess.updateProcessTransaction({ total: round(total, 8) }));
    }
  }
}

// for rootSaga
export default [
  takeLatest(GET_PRICE, getPrice),
  takeLatest(RECALCULATE, recalculate),
  takeLatest(ADD_TRANSACTION, addTransaction),
  takeEvery(UPDATE_TRANSACTION, updateTransaction),
  takeLatest(GET_AVAILABLE_TRANSACTIONS, getTransactionsList),
];
