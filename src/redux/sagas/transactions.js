import get from 'lodash/get';
import { put, call, takeLatest, select, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import Config from '../../constants/config';
import { round } from '../../lib/utils';
import { transactions } from '../actions';
import api from '../../api';
import selectors from '../selectors';
import {
  GET_PRICE,
  GET_TRANSACTION_PRICE_SUCCESS,
  RECALCULATE,
  UPDATE_DRAFT_TRANSACTION,
  UPDATE_DRAFT_TRANSACTION_SUCCESS,
  UPDATE_DRAFT_TRANSACTION_ERROR,
  GET_AVAILABLE_TRANSACTIONS,
  UPDATE_PORTFOLIOS,
  UPDATE_COIN_TRANSACTIONS,
  UPDATE_TRANSACTIONS_ITEMS,
  GET_TRANSACTIONS_SUCCESS,
  TRANSACTIONS_ADD,
  TRANSACTIONS_REMOVE,
  UPDATE_COINS_CACHE,
  CLEAR_DRAFT_TRANSACTION,
  TRANSACTIONS_REMOVE_SUCCESS,
  COIN_TRANSACTION_REMOVE,
} from '../actions/action.types';

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
      payload: transactions,
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
  const { coin } = response.data.response;
  yield put({
    type: UPDATE_TRANSACTIONS_ITEMS,
    payload: coin.transactions,
  });
  yield put({
    type: UPDATE_COINS_CACHE,
    payload: {
      [coin._id]: {
        _id: coin._id,
        amount: coin.amount,
        market: coin.market._id,
        portfolio: coin.portfolio,
        transactions: coin.transactions.map(transaction => transaction._id),
      },
    },
  });
  yield put({
    type: UPDATE_COIN_TRANSACTIONS,
    payload: { coinId: coin._id, transactions: coin.transactions },
  });
  yield put({ type: UPDATE_PORTFOLIOS, payload: {} });
  yield put({ type: GET_TRANSACTIONS_SUCCESS });
  yield put({ type: CLEAR_DRAFT_TRANSACTION });
}

export function* removeTransaction(action) {
  const response = yield call(api.coins.removeTransaction, action.payload);
  const { transaction } = response.data.response;
  const { coin, pair } = transaction;
  yield put({ type: COIN_TRANSACTION_REMOVE, payload: { coinId: coin, transaction } });
  if (pair) yield put({ type: COIN_TRANSACTION_REMOVE, payload: { coinId: pair, transaction } });
  yield put({ type: TRANSACTIONS_REMOVE_SUCCESS, payload: transaction });
  // yield put({ type: UPDATE_PORTFOLIOS, payload: {} });
}

/**
 * action.payload: {  }
 */

function* updateDraftTransaction(action) {
  try {
    yield put({ type: UPDATE_DRAFT_TRANSACTION_SUCCESS, payload: action.payload });
    if (
      action.payload.market ||
      action.payload.currency ||
      action.payload.exchange ||
      action.payload.type ||
      action.payload.date ||
      action.payload.time
    ) {
      const draft = yield select(selectors.getTransaction);
      const markets = yield select(selectors.getMarkets);
      const currencies = yield select(selectors.getCurrencies);
      const exchange = draft.exchange || Config.BTC;
      const currency = draft.currency || Config.USD;
      const fsym = get(markets, `${draft.market}.symbol`, null);
      const tsyms = draft.type === 'exchange' && draft.exchange ?
        get(markets, `${exchange}.symbol`, null) :
        get(currencies, `${currency}.code`, null);
      const date = moment(`${draft.date} ${draft.time}`, 'YYYY-MM-DD hh:mm').toString();
      if (fsym && tsyms && date) {
        const response = yield call(api.coins.getPrice, { fsym, tsyms, date });
        yield put({ type: GET_TRANSACTION_PRICE_SUCCESS, payload: response.data.data[tsyms] });
        yield put({ type: RECALCULATE, payload: 'price' });
      }
    }
  } catch (error) {
    yield put({ type: UPDATE_DRAFT_TRANSACTION_ERROR, payload: error });
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
      yield put(transactions.updateDraftTransaction({ total: round(total, 12) }));
    } else if (+draft.total) {
      const amount = draft.total / draft.price;
      yield put(transactions.updateDraftTransaction({ amount: round(amount, 12) }));
    }
  }
  if (action.payload === 'total') {
    if (+draft.total) {
      if (+draft.amount) {
        const price = draft.total / draft.amount;
        yield put(transactions.updateDraftTransaction({ price: round(price, 12) }));
      } else {
        const amount = draft.total / draft.price;
        yield put(transactions.updateDraftTransaction({ amount: round(amount, 12) }));
      }
    }
  }
  if (action.payload === 'amount') {
    if (+draft.price) {
      const total = draft.price * draft.amount;
      yield put(transactions.updateDraftTransaction({ total: round(total, 12) }));
    }
  }
}

// for rootSaga
export default [
  takeLatest(GET_PRICE, getPrice),
  takeLatest(RECALCULATE, recalculate),
  takeLatest(TRANSACTIONS_ADD, addTransaction),
  takeLatest(TRANSACTIONS_REMOVE, removeTransaction),
  takeEvery(UPDATE_DRAFT_TRANSACTION, updateDraftTransaction),
  takeLatest(GET_AVAILABLE_TRANSACTIONS, getTransactionsList),
];
