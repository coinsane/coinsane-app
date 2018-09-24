import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  coin as coinActions,
  market as marketActions,
} from 'src/actions';
import api from 'src/api';

import selectors from './selectors';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action.payload { market, fsym, tsym, range }
 */
export function* coinHistoUpdate (action: ReturnType<typeof coinActions.getCoinHisto>) {
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
    type: marketActions.ActionTypes.MARKET_CHART_UPDATE,
  });
  yield put({ type: coinActions.ActionTypes.COIN_HISTO_UPDATE_SUCCESS });
}

// for rootSaga
export default [
  takeLatest(coinActions.ActionTypes.COIN_HISTO_UPDATE, coinHistoUpdate),
];
