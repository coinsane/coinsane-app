import {
  GET_AVAILABLE_TRANSACTIONS,
  TRANSACTIONS_ADD,
} from '../../actions/action.types';

/**
 * Get Market Cap
 */
export const addTransaction = payload => ({
  type: TRANSACTIONS_ADD,
  payload,
});

/**
 * Get user transactions for particular coin
 */
export function getTransactions(payload) {
  return {
    type: GET_AVAILABLE_TRANSACTIONS,
    payload,
  };
}
