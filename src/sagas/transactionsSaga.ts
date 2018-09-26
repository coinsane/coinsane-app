import get from 'lodash/get';
import moment from 'moment';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  coinsActions,
  portfoliosActions,
  transactionsActions,
} from 'src/actions';
import { api, math } from 'src/services';

import Config from 'src/constants/config';

import selectors from './selectors';

/**
 * action.payload: { coinId, refreshing }
 */
export function* getTransactionsList(action) {
  const { coinId } = action.payload;
  if (coinId) {
    const response = yield call(api.coins.getTransactions, { coinId });
    const { transactions } = response.data.response;
    yield put({
      payload: transactions,
      type: transactionsActions.ActionTypes.UPDATE_TRANSACTIONS_ITEMS,
    });
    yield put({
      payload: { coinId, transactions },
      type: coinsActions.ActionTypes.UPDATE_COIN_TRANSACTIONS,
    });
    yield put({ type: transactionsActions.ActionTypes.GET_TRANSACTIONS_SUCCESS });
  }
}

/**
 * action.payload: {  }
 */

export function* addTransaction(action) {
  const response = yield call(api.coins.addTransaction, action.payload);
  const { coin } = response.data.response;
  yield put({
    payload: coin.transactions,
    type: transactionsActions.ActionTypes.UPDATE_TRANSACTIONS_ITEMS,
  });
  yield put({
    payload: {
      [coin._id]: {
        _id: coin._id,
        amount: coin.amount,
        market: coin.market._id,
        portfolio: coin.portfolio,
        transactions: coin.transactions.map(transaction => transaction._id),
      },
    },
    type: coinsActions.ActionTypes.UPDATE_COINS_CACHE,
  });
  yield put({
    payload: { coinId: coin._id, transactions: coin.transactions },
    type: coinsActions.ActionTypes.UPDATE_COIN_TRANSACTIONS,
  });
  yield put({ type: portfoliosActions.ActionTypes.UPDATE_PORTFOLIOS, payload: {} });
  yield put({ type: transactionsActions.ActionTypes.GET_TRANSACTIONS_SUCCESS });
  yield put({ type: transactionsActions.ActionTypes.CLEAR_DRAFT_TRANSACTION });
}

export function* removeTransaction (action) {
  const response = yield call(api.coins.removeTransaction, action.payload);
  const { transaction } = response.data.response;
  const { coin, pair } = transaction;
  yield put({
    payload: { transaction, coinId: coin },
    type: coinsActions.ActionTypes.COIN_TRANSACTION_REMOVE,
  });
  if (pair) {
    yield put({
      payload: { transaction, coinId: pair },
      type: coinsActions.ActionTypes.COIN_TRANSACTION_REMOVE,
    });
  }
  yield put({
    payload: transaction,
    type: transactionsActions.ActionTypes.TRANSACTIONS_REMOVE_SUCCESS,
  });
  // yield put({ type: UPDATE_PORTFOLIOS, payload: {} });
}

/**
 * action.payload: {  }
 */

function* updateDraftTransaction (action) {
  try {
    yield put({
      payload: action.payload,
      type: transactionsActions.ActionTypes.UPDATE_DRAFT_TRANSACTION_SUCCESS,
    });
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
        yield put({
          payload: response.data.data[tsyms],
          type: transactionsActions.ActionTypes.GET_TRANSACTION_PRICE_SUCCESS,
        });
        yield put({
          payload: 'price',
          type: transactionsActions.ActionTypes.RECALCULATE,
        });
      }
    }
  } catch (error) {
    yield put({
      payload: error,
      type: transactionsActions.ActionTypes.UPDATE_DRAFT_TRANSACTION_ERROR,
    });
  }
}

/**
 * action.payload: { fsym, tsyms, date }
 */
export function* getPrice (action) {
  const response = yield call(api.coins.getPrice, action.payload);
  yield put({
    payload: response.data.data[action.payload.tsyms],
    type: transactionsActions.ActionTypes.GET_TRANSACTION_PRICE_SUCCESS,
  });
  yield put({
    payload: 'price',
    type: transactionsActions.ActionTypes.RECALCULATE,
  });
}

/**
 * Calculate transaction amount, price, total
 */
export function* recalculate (action) {
  const draft = yield select(selectors.getTransaction);
  if (action.payload === 'price') {
    if (+draft.amount) {
      const total = draft.price * draft.amount;
      yield put(transactionsActions.updateDraftTransaction({ total: math.round(total, 12) }));
    } else if (+draft.total) {
      const amount = draft.total / draft.price;
      yield put(transactionsActions.updateDraftTransaction({ amount: math.round(amount, 12) }));
    }
  }
  if (action.payload === 'total') {
    if (+draft.total) {
      if (+draft.amount) {
        const price = draft.total / draft.amount;
        yield put(transactionsActions.updateDraftTransaction({ price: math.round(price, 12) }));
      } else {
        const amount = draft.total / draft.price;
        yield put(transactionsActions.updateDraftTransaction({ amount: math.round(amount, 12) }));
      }
    }
  }
  if (action.payload === 'amount') {
    if (+draft.price) {
      const total = draft.price * draft.amount;
      yield put(transactionsActions.updateDraftTransaction({ total: math.round(total, 12) }));
    }
  }
}

// for rootSaga
export default [
  takeLatest(coinsActions.ActionTypes.GET_PRICE, getPrice),
  takeLatest(transactionsActions.ActionTypes.RECALCULATE, recalculate),
  takeLatest(transactionsActions.ActionTypes.TRANSACTIONS_ADD, addTransaction),
  takeLatest(transactionsActions.ActionTypes.TRANSACTIONS_REMOVE, removeTransaction),
  takeLatest(coinsActions.ActionTypes.GET_AVAILABLE_TRANSACTIONS, getTransactionsList),
  takeEvery(transactionsActions.ActionTypes.UPDATE_DRAFT_TRANSACTION, updateDraftTransaction),
];