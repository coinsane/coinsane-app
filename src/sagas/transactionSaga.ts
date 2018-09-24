import get from 'lodash/get';
import moment from 'moment';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  coin as coinActions,
  currencies as currenciesActions,
  portfolio as portfolioActions,
  transaction as transactionActions,
} from 'src/actions';
import api from 'src/api';

import Config from 'src/constants/config';
import { round } from 'src/lib/utils';

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
      type: transactionActions.ActionTypes.UPDATE_TRANSACTIONS_ITEMS,
    });
    yield put({
      payload: { coinId, transactions },
      type: coinActions.ActionTypes.UPDATE_COIN_TRANSACTIONS,
    });
    yield put({ type: transactionActions.ActionTypes.GET_TRANSACTIONS_SUCCESS });
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
    type: transactionActions.ActionTypes.UPDATE_TRANSACTIONS_ITEMS,
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
    type: coinActions.ActionTypes.UPDATE_COINS_CACHE,
  });
  yield put({
    payload: { coinId: coin._id, transactions: coin.transactions },
    type: coinActions.ActionTypes.UPDATE_COIN_TRANSACTIONS,
  });
  yield put({ type: portfolioActions.ActionTypes.UPDATE_PORTFOLIOS, payload: {} });
  yield put({ type: transactionActions.ActionTypes.GET_TRANSACTIONS_SUCCESS });
  yield put({ type: transactionActions.ActionTypes.CLEAR_DRAFT_TRANSACTION });
}

export function* removeTransaction (action) {
  const response = yield call(api.coins.removeTransaction, action.payload);
  const { transaction } = response.data.response;
  const { coin, pair } = transaction;
  yield put({
    payload: { transaction, coinId: coin },
    type: coinActions.ActionTypes.COIN_TRANSACTION_REMOVE,
  });
  if (pair) {
    yield put({
      payload: { transaction, coinId: pair },
      type: coinActions.ActionTypes.COIN_TRANSACTION_REMOVE,
    });
  }
  yield put({
    payload: transaction,
    type: transactionActions.ActionTypes.TRANSACTIONS_REMOVE_SUCCESS,
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
      type: transactionActions.ActionTypes.UPDATE_DRAFT_TRANSACTION_SUCCESS,
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
          type: transactionActions.ActionTypes.GET_TRANSACTION_PRICE_SUCCESS,
        });
        yield put({
          payload: 'price',
          type: transactionActions.ActionTypes.RECALCULATE,
        });
      }
    }
  } catch (error) {
    yield put({
      payload: error,
      type: transactionActions.ActionTypes.UPDATE_DRAFT_TRANSACTION_ERROR,
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
    type: transactionActions.ActionTypes.GET_TRANSACTION_PRICE_SUCCESS,
  });
  yield put({
    payload: 'price',
    type: transactionActions.ActionTypes.RECALCULATE,
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
      yield put(transactionActions.updateDraftTransaction({ total: round(total, 12) }));
    } else if (+draft.total) {
      const amount = draft.total / draft.price;
      yield put(transactionActions.updateDraftTransaction({ amount: round(amount, 12) }));
    }
  }
  if (action.payload === 'total') {
    if (+draft.total) {
      if (+draft.amount) {
        const price = draft.total / draft.amount;
        yield put(transactionActions.updateDraftTransaction({ price: round(price, 12) }));
      } else {
        const amount = draft.total / draft.price;
        yield put(transactionActions.updateDraftTransaction({ amount: round(amount, 12) }));
      }
    }
  }
  if (action.payload === 'amount') {
    if (+draft.price) {
      const total = draft.price * draft.amount;
      yield put(transactionActions.updateDraftTransaction({ total: round(total, 12) }));
    }
  }
}

// for rootSaga
export default [
  takeLatest(coinActions.ActionTypes.GET_PRICE, getPrice),
  takeLatest(transactionActions.ActionTypes.RECALCULATE, recalculate),
  takeLatest(transactionActions.ActionTypes.TRANSACTIONS_ADD, addTransaction),
  takeLatest(transactionActions.ActionTypes.TRANSACTIONS_REMOVE, removeTransaction),
  takeLatest(currenciesActions.ActionTypes.GET_AVAILABLE_TRANSACTIONS, getTransactionsList),
  takeEvery(transactionActions.ActionTypes.UPDATE_DRAFT_TRANSACTION, updateDraftTransaction),
];
