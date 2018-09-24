import { AnyAction } from 'redux';

export enum ActionTypes {
  GET_PAGES = 'page/GET_PAGES',
  GET_PAGES_SUCCESS = 'page/GET_PAGES_SUCCESS',
  GET_PAGES_ERROR = 'page/GET_PAGES_ERROR',
}

export interface IPageAction extends AnyAction {
  payload: any;
  type: ActionTypes.GET_PAGES
    | ActionTypes.GET_PAGES_SUCCESS
    | ActionTypes.GET_PAGES_ERROR
    ;
}

export function getPages () {
  return {
    type: ActionTypes.GET_PAGES,
  };
}
