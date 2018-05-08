import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import {
  GET_TOKEN,
  GET_TOKEN_SUCCEED,
  GET_TOKEN_ERROR,
  GET_SETTINGS,
  GET_SETTINGS_SUCCEED,
  GET_SETTINGS_ERROR,
} from '../../../redux/actions/action.types';

export function* getToken() {
  try {
    const token = yield AsyncStorage.getItem('token');
    if (token !== null) {
      yield put({ type: GET_TOKEN_SUCCEED, token });
    } else {
      const response = yield axios.get('/auth/getToken');
      yield put({ type: GET_TOKEN_SUCCEED, token: response.data.result.token });
    }
  } catch (error) {
    yield put({ type: GET_TOKEN_ERROR, error });
  }
}

export function* getSettings() {
  try {
    const response = yield axios.get('/settings');
    yield put({ type: GET_SETTINGS_SUCCEED, payload: response.data.result.settings });
  } catch (error) {
    yield put({ type: GET_SETTINGS_ERROR, error });
  }
}

export default [
  takeLatest(GET_TOKEN, getToken),
  takeLatest(GET_SETTINGS, getSettings),
];
