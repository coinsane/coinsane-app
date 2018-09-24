import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  currency as currencyActions,
  market as marketActions,
} from 'src/actions';
import api from 'src/api';

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
      type: marketActions.ActionTypes.GET_AVAILABLE_MARKETS_SUCCESS,
    });
    // }
  } catch (error) {
    yield put({ type: marketActions.ActionTypes.GET_AVAILABLE_MARKETS_ERROR, payload: error });
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
      type: marketActions.ActionTypes.GET_MARKET_CAP_SUCCESS,
      payload: { [action.payload]: response.data.data },
    });
  } catch (error) {
    yield put({ type: marketActions.ActionTypes.GET_MARKET_CAP_ERROR, payload: error });
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
      type: marketActions.ActionTypes.GET_AVAILABLE_MARKETS_SUCCESS,
      payload: {
        list: response.data.response.result,
        count: response.data.response.count,
        ...action.payload,
      },
    });
  } catch (error) {
    yield put({ type: marketActions.ActionTypes.GET_AVAILABLE_MARKETS_ERROR, payload: error });
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
      type: currencyActions.ActionTypes.GET_AVAILABLE_CURRENCIES_SUCCESS,
      payload: {
        list: response.data.response.result,
        count: response.data.response.count,
        ...action.payload,
      },
    });
  } catch (error) {
    yield put({ type: currencyActions.ActionTypes.GET_AVAILABLE_CURRENCIES_ERROR, payload: error });
  }
}

export function* marketsExchangeUpdate (action) {
  try {
    const { marketId } = action.payload;
    const { success, exchanges, message } = yield call(api.coins.getExchanges, action.payload);
    if (success) {
      yield put({
        payload: { marketId, exchanges },
        type: marketActions.ActionTypes.EXCHANGES_UPDATE_SUCCESS,
      });
    } else {
      yield put({
        payload: message,
        type: marketActions.ActionTypes.EXCHANGES_UPDATE_ERROR,
      });
    }
  } catch (e) {
    yield put({
      payload: '500',
      type: marketActions.ActionTypes.EXCHANGES_UPDATE_ERROR,
    });
  }
}

export default [
  takeLatest(marketActions.ActionTypes.GET_MARKET_CAP, getMarketCap),
  takeLatest(marketActions.ActionTypes.GET_AVAILABLE_MARKETS, fetchAvailableMarkets),
  takeLatest(marketActions.ActionTypes.SEARCH_AVAILABLE_MARKETS, searchAvailableMarkets),
  takeLatest(marketActions.ActionTypes.SEARCH_AVAILABLE_CURRENCIES, searchAvailableCurrencies),
  takeLatest(marketActions.ActionTypes.EXCHANGES_UPDATE, marketsExchangeUpdate),
];
