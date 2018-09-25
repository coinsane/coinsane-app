import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  currenciesActions,
  marketsActions,
} from 'src/actions';
import { api } from 'src/services';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action.payload { q }
 */
export function* fetchAvailableMarkets (action) {
  try {
    const q = action.payload.q ? `:${action.payload.q.toLowerCase()}` : '';
    // const cache = yield select(selectors.getCache);
    // const cacheKey = `${action.payload.skip}${q}`;
    // if (cache[cacheKey] && cache[cacheKey].length) {
    //   yield delay(10);
    //   yield put({
    //     type: GET_AVAILABLE_MARKETS_SUCCESS,
    //     payload: {
    //       cached: true,
    //       ...action.payload,
    //       list: cache[cacheKey],
    //     },
    //   });
    // } else {
    if (q) {
      if (!action.payload.skip) yield delay(500);
    }
    const response = yield call(api.markets.searchAvailableMarkets, action.payload);
    yield put({
      payload: {
        ...action.payload,
        count: response.data.response.count,
        list: response.data.response.result,
      },
      type: marketsActions.ActionTypes.GET_AVAILABLE_MARKETS_SUCCESS,
    });
    // }
  } catch (error) {
    yield put({ type: marketsActions.ActionTypes.GET_AVAILABLE_MARKETS_ERROR, payload: error });
  }
}

/**
 * Get Market Cap.
 * @kind SideEffect
 */
export function* getMarketCap (action) {
  try {
    const response = yield call(api.markets.getMarketCap, action.payload);
    yield put({
      type: marketsActions.ActionTypes.GET_MARKET_CAP_SUCCESS,
      payload: { [action.payload]: response.data.data },
    });
  } catch (error) {
    yield put({ type: marketsActions.ActionTypes.GET_MARKET_CAP_ERROR, payload: error });
  }
}

/**
 * Search Markets side effect.
 * @kind SideEffect
 * @param action
 */
export function* searchAvailableMarkets (action) {
  try {
    if (action.payload.q) yield delay(500);
    const response = yield call(api.markets.searchAvailableMarkets, action.payload);
    yield put({
      type: marketsActions.ActionTypes.GET_AVAILABLE_MARKETS_SUCCESS,
      payload: {
        list: response.data.response.result,
        count: response.data.response.count,
        ...action.payload,
      },
    });
  } catch (error) {
    yield put({ type: marketsActions.ActionTypes.GET_AVAILABLE_MARKETS_ERROR, payload: error });
  }
}

/**
 * Search Currencies side effect.
 * @kind SideEffect
 * @param action
 */
export function* searchAvailableCurrencies (action) {
  try {
    if (action.payload.q) yield delay(500);
    const response = yield call(
        api.markets.searchAvailableMarkets,
        { ...action.payload, type: 'currency' },
      );
    yield put({
      type: currenciesActions.ActionTypes.GET_AVAILABLE_CURRENCIES_SUCCESS,
      payload: {
        list: response.data.response.result,
        count: response.data.response.count,
        ...action.payload,
      },
    });
  } catch (error) {
    yield put({ type: currenciesActions.ActionTypes.GET_AVAILABLE_CURRENCIES_ERROR, payload: error });
  }
}

export function* marketsExchangeUpdate (action) {
  try {
    const { marketId } = action.payload;
    const { success, exchanges, message } = yield call(api.coins.getExchanges, action.payload);
    if (success) {
      yield put({
        payload: { marketId, exchanges },
        type: marketsActions.ActionTypes.EXCHANGES_UPDATE_SUCCESS,
      });
    } else {
      yield put({
        payload: message,
        type: marketsActions.ActionTypes.EXCHANGES_UPDATE_ERROR,
      });
    }
  } catch (e) {
    yield put({
      payload: '500',
      type: marketsActions.ActionTypes.EXCHANGES_UPDATE_ERROR,
    });
  }
}

export default [
  takeLatest(marketsActions.ActionTypes.GET_MARKET_CAP, getMarketCap),
  takeLatest(marketsActions.ActionTypes.GET_AVAILABLE_MARKETS, fetchAvailableMarkets),
  takeLatest(marketsActions.ActionTypes.SEARCH_AVAILABLE_MARKETS, searchAvailableMarkets),
  takeLatest(marketsActions.ActionTypes.SEARCH_AVAILABLE_CURRENCIES, searchAvailableCurrencies),
  takeLatest(marketsActions.ActionTypes.EXCHANGES_UPDATE, marketsExchangeUpdate),
];
