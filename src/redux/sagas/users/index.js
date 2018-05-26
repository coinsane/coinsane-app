import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';

import selectors from '../../selectors';
import {
  GET_TOKEN,
  GET_TOKEN_SUCCEED,
  GET_TOKEN_ERROR,
  GET_SETTINGS,
  GET_SETTINGS_SUCCEED,
  GET_SETTINGS_ERROR,
  UPDATE_PORTFOLIOS,
  UPDATE_PORTFOLIO_CHART,
} from '../../../redux/actions/action.types';

export function* getToken() {
  try {
    let token = yield select(selectors.getToken);
    if (!token) {
      const { data: { result: { token: newToken } } } = yield axios.get('/auth/getToken');
      token = newToken;
    }
    yield put({ type: GET_TOKEN_SUCCEED, token });
    yield put({ type: GET_SETTINGS });
    const currency = yield select(selectors.getCurrency);
    yield put({ type: UPDATE_PORTFOLIOS, payload: currency });
    yield put({ type: UPDATE_PORTFOLIO_CHART, payload: { portfolioId: 'all', range: '1d', symbol: currency } });
  } catch (error) {
    yield put({ type: GET_TOKEN_ERROR, error });
  }
}

export function* getSettings() {
  try {
    const { data } = yield axios.get('/settings');
    yield put({ type: GET_SETTINGS_SUCCEED, payload: data.data });
  } catch (error) {
    yield put({ type: GET_SETTINGS_ERROR, error });
  }
}

export default [
  takeLatest(GET_TOKEN, getToken),
  takeLatest(GET_SETTINGS, getSettings),
];
