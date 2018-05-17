import { takeLatest, put, call } from 'redux-saga/effects';
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

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action
 */
export function* fetchAvailableMarkets(action) {
  try {
    const response = yield call(api.markets.fetchAvailableMarkets, action.payload.limit);
    yield put({ type: GET_AVAILABLE_MARKETS_SUCCESS, payload: response.data.response.result });
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
    const response = yield call(api.markets.searchAvailableMarkets, action.payload);
    yield put({ type: GET_AVAILABLE_MARKETS_SUCCESS, payload: response.data.response.result });
  } catch (error) {
    yield put({ type: GET_AVAILABLE_MARKETS_ERROR, payload: error });
  }
}

export default [
  takeLatest(GET_MARKET_CAP, getMarketCap),
  takeLatest(GET_AVAILABLE_MARKETS, fetchAvailableMarkets),
  takeLatest(SEARCH_AVAILABLE_MARKETS, searchAvailableMarkets),
];
