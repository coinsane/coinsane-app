import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../../api';
import {
  COIN_HISTO_UPDATE,
  COIN_HISTO_UPDATE_SUCCESS,
  COIN_MARKETS_UPDATE,
  COIN_MARKETS_UPDATE_SUCCESS,
} from '../../../redux/actions/action.types';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param payload { fsym, tsym, range }
 */
export function* coinHistoUpdate(action) {
  const response = yield call(api.coins.getCoinHisto, action.payload);
  yield put({ type: COIN_HISTO_UPDATE_SUCCESS, payload: response.data });
}


export function* coinMarketsUpdate(action) {
  const response = yield call(api.coins.getCoinMarkets, action.payload);
  yield put({ type: COIN_MARKETS_UPDATE_SUCCESS, payload: response.data.data.markets });
}

// for rootSaga
export default [
  takeLatest(COIN_HISTO_UPDATE, coinHistoUpdate),
  takeLatest(COIN_MARKETS_UPDATE, coinMarketsUpdate),
];
