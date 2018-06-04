import {
  GET_AVAILABLE_CURRENCIES,
} from '../../actions/action.types';

/**
 * Get All Markets
 */
export const getAvailableCurrencies = ({ q = '', limit = 10, skip = 0, refreshing = false }) => ({
  type: GET_AVAILABLE_CURRENCIES,
  payload: { q, limit, skip, refreshing },
});
