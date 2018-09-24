import { call, put, select, takeLatest } from 'redux-saga/effects';
import { api } from 'src/services';

import {
  auth as authActions,
  portfolio as portfolioActions,
  settings as settingsActions,
} from 'src/actions';

import selectors from './selectors';

export function* getToken (action) {
  try {
    let token = yield select(selectors.getToken);
    if (!token) {
      const { data: { result: { token: newToken } } } = yield call(api.auth.getToken, action.payload);
      token = newToken;
    }
    yield put({
      token,
      type: authActions.ActionTypes.GET_TOKEN_SUCCEED,
    });
    yield put({ type: settingsActions.ActionTypes.GET_SETTINGS });
    const symbol = yield select(selectors.getSymbol);
    yield put({
      payload: { symbol },
      type: portfolioActions.ActionTypes.UPDATE_PORTFOLIOS,
    });
    yield put({
      payload: '1d',
      type: portfolioActions.ActionTypes.UPDATE_PORTFOLIO_PERIOD_SUCCESS,
    });
    yield put({
      payload: { symbol, portfolioId: 'all', range: '1d' },
      type: portfolioActions.ActionTypes.UPDATE_PORTFOLIO_CHART,
    });
  } catch (error) {
    yield put({ type: authActions.ActionTypes.GET_TOKEN_ERROR, error });
  }
}

export function* getSettings() {
  try {
    const { data } = yield call(api.account.getSettings);
    yield put({ type: settingsActions.ActionTypes.GET_SETTINGS_SUCCEED, payload: data.data });
  } catch (error) {
    yield put({ type: settingsActions.ActionTypes.GET_SETTINGS_ERROR, error });
  }
}

export default [
  takeLatest(authActions.ActionTypes.GET_TOKEN, getToken),
  takeLatest(settingsActions.ActionTypes.GET_SETTINGS, getSettings),
];
