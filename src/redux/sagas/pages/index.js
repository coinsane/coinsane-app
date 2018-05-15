import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../../api';
import {
  GET_PAGES,
  GET_PAGES_SUCCESS,
  GET_PAGES_ERROR,
} from '../../../redux/actions/action.types';

export function* getPagesSaga() {
  try {
    const response = yield call(api.pages.fetchPages);
    yield put({ type: GET_PAGES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: GET_PAGES_ERROR, error });
  }
}

export default [
  takeLatest(GET_PAGES, getPagesSaga),
];
