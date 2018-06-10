import { takeLatest, put, call, select } from 'redux-saga/effects';
import selectors from '../selectors';
import api from '../../api';
import {
  COIN_HISTO_UPDATE,
  COIN_HISTO_UPDATE_SUCCESS,
  MARKET_CHART_UPDATE,
} from '../../redux/actions/action.types';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action.payload { market, fsym, tsym, range }
 */
export function* coinHistoUpdate(action) {
  const {
    marketId,
    fsym,
    tsym,
    range,
  } = action.payload;
  const symbol = yield select(selectors.getSymbol);
  const response = yield call(api.coins.getCoinHisto, { fsym, tsym, range });
  yield put({
    type: MARKET_CHART_UPDATE,
    payload: {
      marketId,
      range,
      symbol,
      data: response.data.data,
    },
  });
  yield put({ type: COIN_HISTO_UPDATE_SUCCESS });
}

// for rootSaga
export default [
  takeLatest(COIN_HISTO_UPDATE, coinHistoUpdate),
];
