import { AnyAction } from 'redux';

export enum ActionTypes {
  GET_TRANSACTIONS_SUCCESS = 'transaction/GET_TRANSACTIONS_SUCCESS',
  TRANSACTIONS_ADD = 'transaction/TRANSACTIONS_ADD',
  TRANSACTIONS_ADD_SUCCESS = 'transaction/TRANSACTIONS_ADD_SUCCESS',
  TRANSACTIONS_ADD_ERROR = 'transaction/TRANSACTIONS_ADD_ERROR',
  TRANSACTIONS_REMOVE = 'transaction/TRANSACTIONS_REMOVE',
  TRANSACTIONS_REMOVE_SUCCESS = 'transaction/TRANSACTIONS_REMOVE_SUCCESS',
  UPDATE_DRAFT_TRANSACTION = 'transaction/UPDATE_DRAFT_TRANSACTION',
  UPDATE_DRAFT_TRANSACTION_SUCCESS = 'transaction/UPDATE_DRAFT_TRANSACTION_SUCCESS',
  UPDATE_DRAFT_TRANSACTION_ERROR = 'transaction/UPDATE_DRAFT_TRANSACTION_ERROR',
  CLEAR_DRAFT_TRANSACTION = 'transaction/CLEAR_DRAFT_TRANSACTION',
  RECALCULATE = 'transaction/RECALCULATE',
  GET_TRANSACTION_PRICE_SUCCESS = 'transaction/GET_TRANSACTION_PRICE_SUCCESS',
  UPDATE_TRANSACTIONS_ITEMS = 'transaction/UPDATE_TRANSACTIONS_ITEMS',
}

export interface ITransactionAction extends AnyAction {
  payload: any;
  type: ActionTypes.GET_TRANSACTIONS_SUCCESS
    | ActionTypes.TRANSACTIONS_ADD
    | ActionTypes.TRANSACTIONS_ADD_SUCCESS
    | ActionTypes.TRANSACTIONS_ADD_ERROR
    | ActionTypes.TRANSACTIONS_REMOVE
    | ActionTypes.TRANSACTIONS_REMOVE_SUCCESS
    | ActionTypes.UPDATE_DRAFT_TRANSACTION
    | ActionTypes.UPDATE_DRAFT_TRANSACTION_SUCCESS
    | ActionTypes.UPDATE_DRAFT_TRANSACTION_ERROR
    | ActionTypes.CLEAR_DRAFT_TRANSACTION
    | ActionTypes.RECALCULATE
    | ActionTypes.GET_TRANSACTION_PRICE_SUCCESS
    | ActionTypes.UPDATE_TRANSACTIONS_ITEMS
    ;
}

export const updateDraftTransaction = payload => ({ type: ActionTypes.UPDATE_DRAFT_TRANSACTION, payload });

export const clearDraftTransaction = () => ({ type: ActionTypes.CLEAR_DRAFT_TRANSACTION, payload: {} });

export const recalculate = payload => ({ type: ActionTypes.RECALCULATE, payload });

export const addTransaction = payload => ({ type: ActionTypes.TRANSACTIONS_ADD, payload });

export const delTransaction = payload => ({ type: ActionTypes.TRANSACTIONS_REMOVE, payload });

export function getTransactions (payload) {
  return {
    type: ActionTypes.GET_AVAILABLE_TRANSACTIONS,
    payload,
  };
}
