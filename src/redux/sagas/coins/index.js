import { takeLatest, put, call, select } from 'redux-saga/effects';
import selectors from '../../selectors';
import api from '../../../api';
import {
  COIN_HISTO_UPDATE,
  COIN_MARKETS_UPDATE,
  COIN_MARKETS_UPDATE_SUCCESS,
  MARKET_CHART_UPDATE,
} from '../../../redux/actions/action.types';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action.payload { market, fsym, tsym, range }
 */
export function* coinHistoUpdate(action) {
  const {
    market,
    fsym,
    tsym,
    range,
  } = action.payload;
  const symbol = yield select(selectors.getSymbol);
  const response = yield call(api.coins.getCoinHisto, { fsym, tsym, range });
  yield put({
    type: MARKET_CHART_UPDATE,
    payload: {
      market,
      range,
      symbol,
      data: response.data.data,
    },
  });
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
