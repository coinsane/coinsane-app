import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { page as pageActions } from 'src/actions';

export function* getPagesSaga () {
  try {
    const response = yield axios.get('/pages');
    yield put({
      payload: response.data.data,
      type: pageActions.ActionTypes.GET_PAGES_SUCCESS,
    });
  } catch (error) {
    yield put({
      error,
      type: pageActions.ActionTypes.GET_PAGES_ERROR,
    });
  }
}

export default [
  takeLatest(pageActions.ActionTypes.GET_PAGES, getPagesSaga),
];
