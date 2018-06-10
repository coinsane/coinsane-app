import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../api';
import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  SELECT_CATEGORY,
  SELECT_CATEGORY_SUCCESS,
  SELECT_CATEGORY_ERROR,
} from '../../redux/actions/action.types';

export function* fetchCategories(action) {
  const response = yield call(api.categories.fetchCategories, action.payload);
  yield put({
    type: GET_CATEGORIES_SUCCESS,
    payload: {
      categories: response.data.categories,
    },
  });
}

export function* selectCurrency(action) {
  try {
    yield put({ type: SELECT_CATEGORY_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: SELECT_CATEGORY_ERROR, error });
  }
}

// for rootSaga
export default [
  takeLatest(GET_CATEGORIES, fetchCategories),
  takeLatest(SELECT_CATEGORY, selectCurrency),
];
