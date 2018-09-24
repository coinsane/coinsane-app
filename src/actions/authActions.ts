import { AnyAction } from 'redux';

export enum ActionTypes {
  GET_TOKEN = 'auth/GET_TOKEN',
  GET_TOKEN_SUCCEED = 'auth/GET_TOKEN_SUCCEED',
  GET_TOKEN_ERROR = 'auth/GET_TOKEN_ERROR',
  USER_LOGIN = 'auth/USER_LOGIN',
  USER_DETAILS_UPDATE = 'auth/USER_DETAILS_UPDATE',
  USER_ERROR = 'auth/USER_ERROR',
  USER_RESET = 'auth/USER_RESET',
}

export interface IAuthAction extends AnyAction {
  payload: any;
  type: ActionTypes.GET_TOKEN
    | ActionTypes.GET_TOKEN_SUCCEED
    | ActionTypes.GET_TOKEN_ERROR
    | ActionTypes.USER_LOGIN
    | ActionTypes.USER_DETAILS_UPDATE
    | ActionTypes.USER_ERROR
    | ActionTypes.USER_RESET
    ;
}

export const getToken = payload => ({ type: ActionTypes.GET_TOKEN, payload });
