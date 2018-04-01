import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import api from '../../../api';
import {
  COIN_HISTO_UPDATE,
  COIN_HISTO_UPDATE_SUCCESS
} from '../../../redux/actions/action.types';

/////////////////////////////////////////////////////////////////

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param payload { fsym, tsym, range }
 */
export function* coinHistoUpdate(action) {
  const response = yield call(api.coins.getCoinHisto, action.payload);
  yield put({ type: COIN_HISTO_UPDATE_SUCCESS, payload: response.data });
}

// for rootSaga
export default [
  takeLatest(COIN_HISTO_UPDATE, coinHistoUpdate)
];