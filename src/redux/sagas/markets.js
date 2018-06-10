import { delay } from 'redux-saga';
import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../api';
import {
  GET_AVAILABLE_MARKETS,
  GET_AVAILABLE_MARKETS_SUCCESS,
  GET_AVAILABLE_MARKETS_ERROR,
  SEARCH_AVAILABLE_MARKETS,
  GET_MARKET_CAP,
  GET_MARKET_CAP_SUCCESS,
  GET_MARKET_CAP_ERROR,
  EXCHANGES_UPDATE,
  EXCHANGES_UPDATE_SUCCESS,
  EXCHANGES_UPDATE_ERROR,
} from '../../redux/actions/action.types';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action.payload { q }
 */
export function* fetchAvailableMarkets(action) {
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
    let fetchEndpoint = api.markets.fetchAvailableMarkets;
    if (q) {
      fetchEndpoint = api.markets.searchAvailableMarkets;
      if (!action.payload.skip) yield delay(2000);
    }
    const response = yield call(fetchEndpoint, action.payload);
    yield put({
      type: GET_AVAILABLE_MARKETS_SUCCESS,
      payload: {
        ...action.payload,
        list: response.data.response.result,
        count: response.data.response.count,
      },
    });
    // }
  } catch (error) {
    yield put({ type: GET_AVAILABLE_MARKETS_ERROR, payload: error });
  }
}

/**
 * Get Market Cap.
 * @kind SideEffect
 */
export function* getMarketCap(action) {
  try {
    const response = yield call(api.markets.getMarketCap, action.payload);
    yield put({
      type: GET_MARKET_CAP_SUCCESS,
      payload: { [action.payload]: response.data.data },
    });
  } catch (error) {
    yield put({ type: GET_MARKET_CAP_ERROR, payload: error });
  }
}

/**
 * Search Markets side effect.
 * @kind SideEffect
 * @param action
 */
export function* searchAvailableMarkets(action) {
  try {
    yield delay(2000);
    const response = yield call(api.markets.searchAvailableMarkets, action.payload);
    yield put({
      type: GET_AVAILABLE_MARKETS_SUCCESS,
      payload: {
        list: response.data.response.result,
        ...action.payload,
      },
    });
  } catch (error) {
    yield put({ type: GET_AVAILABLE_MARKETS_ERROR, payload: error });
  }
}

export function* marketsExchangeUpdate(action) {
  try {
    const { marketId } = action.payload;
    const { success, exchanges, message } = yield call(api.coins.getExchanges, action.payload);
    if (success) yield put({ type: EXCHANGES_UPDATE_SUCCESS, payload: { marketId, exchanges } });
    else yield put({ type: EXCHANGES_UPDATE_ERROR, payload: message });
  } catch (e) {
    yield put({ type: EXCHANGES_UPDATE_ERROR, payload: '500' });
  }
}

export default [
  takeLatest(GET_MARKET_CAP, getMarketCap),
  takeLatest(GET_AVAILABLE_MARKETS, fetchAvailableMarkets),
  takeLatest(SEARCH_AVAILABLE_MARKETS, searchAvailableMarkets),
  takeLatest(EXCHANGES_UPDATE, marketsExchangeUpdate),
];
