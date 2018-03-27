import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import api from '../../../api';
import {
  GET_AVALIABLE_MARKETS,
  SEARCH_AVALIABLE_MARKETS,
  GET_AVALIABLE_MARKETS_SUCCESS,
  GET_AVALIABLE_MARKETS_ERROR
} from '../../../redux/actions/action.types';

/////////////////////////////////////////////////////////////////

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param payload { limit: Number }
 */
export function* fetchAvaliableMarkets(action) {
  const response = yield call(api.markets.fetchAvaliableMarkets, action.payload.limit);
  yield put({ type: GET_AVALIABLE_MARKETS_SUCCESS, payload: response.data.response.result });
}

/////////////////////////////////////////////////////////////////

/**
 * Search Markets side effect.
 * @kind SideEffect
 * @param payload term: String - search string input
 */
export function* searchAvaliableMarkets(action) {
  const response = yield call(api.markets.searchAvaliableMarkets, action.payload);
  yield put({ type: GET_AVALIABLE_MARKETS_SUCCESS, payload: response.data.response.result });
}

// for rootSaga
export default [
  takeLatest(GET_AVALIABLE_MARKETS, fetchAvaliableMarkets),
  takeLatest(SEARCH_AVALIABLE_MARKETS, searchAvaliableMarkets)
];