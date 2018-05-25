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
} from '../../../redux/actions/action.types';

export function* getToken() {
  try {
    const token = yield select(selectors.getToken);
    if (token !== null) {
      yield put({ type: GET_TOKEN_SUCCEED, token });
      yield put({ type: GET_SETTINGS });
      const currency = yield select(selectors.getCurrency);
      yield put({ type: UPDATE_PORTFOLIOS, payload: currency });
    } else {
      const response = yield axios.get('/auth/getToken');
      yield put({ type: GET_TOKEN_SUCCEED, token: response.data.result.token });
      yield put({ type: GET_SETTINGS });
      const currency = yield select(selectors.getCurrency);
      yield put({ type: UPDATE_PORTFOLIOS, payload: currency });
    }
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
