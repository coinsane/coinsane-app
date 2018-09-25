import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  coinsActions,
  marketsActions,
} from 'src/actions';
import { api } from 'src/services';

import selectors from './selectors';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action.payload { market, fsym, tsym, range }
 */
export function* coinHistoUpdate (action: ReturnType<typeof coinsActions.getCoinHisto>) {
  const {
    marketId,
    fsym,
    tsym,
    range,
  } = action.payload;
  const symbol = yield select(selectors.getSymbol);
  const response = yield call(api.coins.getCoinHisto, { fsym, tsym, range });
  yield put({
    payload: {
      marketId,
      range,
      symbol,
      data: response.data.data,
    },
    type: marketsActions.ActionTypes.MARKET_CHART_UPDATE,
  });
  yield put({ type: coinsActions.ActionTypes.COIN_HISTO_UPDATE_SUCCESS });
}

// for rootSaga
export default [
  takeLatest(coinsActions.ActionTypes.COIN_HISTO_UPDATE, coinHistoUpdate),
];
