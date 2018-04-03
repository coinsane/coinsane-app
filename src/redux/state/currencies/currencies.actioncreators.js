import {
  GET_AVALIABLE_CURRENCIES,
  UPDATE_CURRENT_CURRENCY
} from '../../actions/action.types';

export const getAvaliableCurrencies = () => dispatch => {
  dispatch({ type: GET_AVALIABLE_CURRENCIES, payload: {} });
}

export const updateCurrentCurrency = (payload) => {
  return { type: UPDATE_CURRENT_CURRENCY, payload };
}
