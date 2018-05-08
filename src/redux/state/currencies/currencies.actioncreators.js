import {
  GET_AVAILABLE_CURRENCIES,
  SELECT_CURRENCY,
} from '../../actions/action.types';

export const getAvailableCurrencies = () => ({ type: GET_AVAILABLE_CURRENCIES, payload: {} });

export const selectCurrency = payload => ({ type: SELECT_CURRENCY, payload });

