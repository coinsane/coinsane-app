import { AnyAction } from 'redux';

export enum ActionTypes {
  GET_CATEGORIES = 'category/GET_CATEGORIES',
  GET_CATEGORIES_SUCCESS = 'category/GET_CATEGORIES_SUCCESS',
  SELECT_CATEGORY = 'category/SELECT_CATEGORY',
  SELECT_CATEGORY_SUCCESS = 'category/SELECT_CATEGORY_SUCCESS',
  SELECT_CATEGORY_ERROR = 'category/SELECT_CATEGORY_ERROR',
}

export interface ICategoryAction extends AnyAction {
  payload: any;
  type: ActionTypes.GET_CATEGORIES
    | ActionTypes.GET_CATEGORIES_SUCCESS
    | ActionTypes.SELECT_CATEGORY
    | ActionTypes.SELECT_CATEGORY_SUCCESS
    | ActionTypes.SELECT_CATEGORY_ERROR
    ;
}

export const getCategories = () => ({ type: ActionTypes.GET_CATEGORIES, payload: {} });

export const selectCategory = () => ({ type: ActionTypes.SELECT_CATEGORY, payload: {} });
