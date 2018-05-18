import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios/index';
import {
  GET_PAGES,
  GET_PAGES_SUCCESS,
  GET_PAGES_ERROR,
} from '../../../redux/actions/action.types';

export function* getPagesSaga() {
  try {
    const response = yield axios.get('/pages');
    yield put({ type: GET_PAGES_SUCCESS, payload: response.data.data });
  } catch (error) {
    yield put({ type: GET_PAGES_ERROR, error });
  }
}

export default [
  takeLatest(GET_PAGES, getPagesSaga),
];
