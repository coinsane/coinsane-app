import { put, call, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { round } from '../../../lib/utils';
import { transactions } from '../../actions';
import api from '../../../api';
import selectors from '../../selectors';
import {
  GET_PRICE,
  GET_TRANSACTION_PRICE_SUCCESS,
  RECALCULATE,
  UPDATE_DRAFT_TRANSACTION,
  GET_AVAILABLE_TRANSACTIONS,
  GET_AVAILABLE_TRANSACTIONS_SUCCESS,
  UPDATE_PORTFOLIOS,
  UPDATE_COIN_TRANSACTIONS,
  UPDATE_TRANSACTIONS_ITEMS,
  GET_TRANSACTIONS_SUCCESS,
  TRANSACTIONS_ADD,
  TRANSACTIONS_ADD_SUCCESS,
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
  const { transactions, _id: coinId } = response.data.response.coin;
  yield put({
    type: UPDATE_TRANSACTIONS_ITEMS,
    payload: { transactions },
  });
  yield put({
    type: UPDATE_COIN_TRANSACTIONS,
    payload: { coinId, transactions },
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
export function* updateDraftTransaction(action) {
  if (!(action.payload.coin || action.payload.market)) return;

  const draft = yield select(selectors.getTransaction);
  const marketItems = yield select(selectors.getMarkets);
  if (marketItems[draft.market].symbol && draft.currency.code && draft.date) {
    const response = yield call(api.coins.getPrice, {
      fsym: marketItems[draft.market].symbol,
      tsyms: draft.currency.code,
      date: draft.date,
    });
    yield put({
      type: GET_TRANSACTION_PRICE_SUCCESS,
      payload: response.data.data[draft.currency.code],
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
  const draft = yield select(selectors.getTransaction);

  if (action.payload === 'price') {
    if (+draft.amount) {
      const total = draft.price * draft.amount;
      yield put(transactions.updateDraftTransaction({ total: round(total, 8) }));
    } else if (+draft.total) {
      const amount = draft.total / draft.price;
      yield put(transactions.updateDraftTransaction({ amount: round(amount, 8) }));
    }
  }
  if (action.payload === 'total') {
    if (+draft.total) {
      if (+draft.amount) {
        const price = draft.total / draft.amount;
        yield put(transactions.updateDraftTransaction({ price: round(price, 8) }));
      } else {
        const amount = draft.total / draft.price;
        yield put(transactions.updateDraftTransaction({ amount: round(amount, 8) }));
      }
    }
  }
  if (action.payload === 'amount') {
    if (+draft.price) {
      const total = draft.price * draft.amount;
      yield put(transactions.updateDraftTransaction({ total: round(total, 8) }));
    }
  }
}

// for rootSaga
export default [
  takeLatest(GET_PRICE, getPrice),
  takeLatest(RECALCULATE, recalculate),
  takeLatest(TRANSACTIONS_ADD, addTransaction),
  takeEvery(UPDATE_DRAFT_TRANSACTION, updateDraftTransaction),
  takeLatest(GET_AVAILABLE_TRANSACTIONS, getTransactionsList),
];
