import {
  GET_AVAILABLE_TRANSACTIONS,
  TRANSACTIONS_ADD,
  UPDATE_DRAFT_TRANSACTION,
  CLEAR_DRAFT_TRANSACTION,
  RECALCULATE,
} from '../../actions/action.types';

export const updateDraftTransaction = payload => ({ type: UPDATE_DRAFT_TRANSACTION, payload });

export const clearDraftTransaction = () => ({ type: CLEAR_DRAFT_TRANSACTION, payload: {} });

export const recalculate = payload => ({ type: RECALCULATE, payload });

export const addTransaction = payload => ({ type: TRANSACTIONS_ADD, payload });

/**
 * Get user transactions for particular coin
 */
export function getTransactions(payload) {
  return {
    type: GET_AVAILABLE_TRANSACTIONS,
    payload,
  };
}
