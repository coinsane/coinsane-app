import { delay } from 'redux-saga';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import api from '../../../api';
import {
  GET_AVAILABLE_MARKETS,
  GET_AVAILABLE_MARKETS_SUCCESS,
  GET_AVAILABLE_MARKETS_ERROR,
  SEARCH_AVAILABLE_MARKETS,
  GET_MARKET_CAP,
  GET_MARKET_CAP_SUCCESS,
  GET_MARKET_CAP_ERROR,
} from '../../../redux/actions/action.types';
import selectors from '../../selectors';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action
 */
export function* fetchAvailableMarkets(action) {
  try {
    const cache = yield select(selectors.getCache);
    const q = action.payload.q ? `:${action.payload.q.toLowerCase()}` : '';
    const cacheKey = `${action.payload.skip}${q}`;
    if (cache[cacheKey] && cache[cacheKey].length) {
      yield delay(100);
      yield put({
        type: GET_AVAILABLE_MARKETS_SUCCESS,
        payload: {
          cached: true,
          ...action.payload,
          list: cache[cacheKey],
        },
      });
    } else {
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
    }
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
    yield put({ type: GET_MARKET_CAP_SUCCESS, payload: response.data.data });
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

export default [
  takeLatest(GET_MARKET_CAP, getMarketCap),
  takeLatest(GET_AVAILABLE_MARKETS, fetchAvailableMarkets),
  takeLatest(SEARCH_AVAILABLE_MARKETS, searchAvailableMarkets),
];
