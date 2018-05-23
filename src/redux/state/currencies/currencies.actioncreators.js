import {
  GET_AVAILABLE_CURRENCIES,
} from '../../actions/action.types';

export const getAvailableCurrencies = () => ({ type: GET_AVAILABLE_CURRENCIES, payload: {} });
