import { call, put, takeLatest } from 'redux-saga/effects';

import { categoriesActions } from 'src/actions';
import { api } from 'src/services';

export function* fetchCategories (action: ReturnType<typeof categoriesActions.getCategories>) {
  const response = yield call(api.categories.fetchCategories, action.payload);
  yield put({
    payload: {
      categories: response.data.categories,
    },
    type: categoriesActions.ActionTypes.GET_CATEGORIES_SUCCESS,
  });
}

export function* selectCurrency (action: ReturnType<typeof categoriesActions.selectCategory>) {
  try {
    yield put({
      payload: action.payload,
      type: categoriesActions.ActionTypes.SELECT_CATEGORY_SUCCESS,
    });
  } catch (error) {
    yield put({
      error,
      type: categoriesActions.ActionTypes.SELECT_CATEGORY_ERROR,
    });
  }
}

// for rootSaga
export default [
  takeLatest(categoriesActions.ActionTypes.GET_CATEGORIES, fetchCategories),
  takeLatest(categoriesActions.ActionTypes.SELECT_CATEGORY, selectCurrency),
];
