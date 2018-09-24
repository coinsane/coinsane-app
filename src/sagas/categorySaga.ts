import { call, put, takeLatest } from 'redux-saga/effects';

import { category as categoryActions } from 'src/actions';
import api from 'src/api';

export function* fetchCategories (action: ReturnType<typeof categoryActions.getCategories>) {
  const response = yield call(api.categories.fetchCategories, action.payload);
  yield put({
    payload: {
      categories: response.data.categories,
    },
    type: categoryActions.ActionTypes.GET_CATEGORIES_SUCCESS,
  });
}

export function* selectCurrency (action: ReturnType<typeof categoryActions.selectCategory>) {
  try {
    yield put({
      payload: action.payload,
      type: categoryActions.ActionTypes.SELECT_CATEGORY_SUCCESS,
    });
  } catch (error) {
    yield put({
      error,
      type: categoryActions.ActionTypes.SELECT_CATEGORY_ERROR,
    });
  }
}

// for rootSaga
export default [
  takeLatest(categoryActions.ActionTypes.GET_CATEGORIES, fetchCategories),
  takeLatest(categoryActions.ActionTypes.SELECT_CATEGORY, selectCurrency),
];
