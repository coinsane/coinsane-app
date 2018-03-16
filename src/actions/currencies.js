import {
  GET_AVALIABLE_CURRENCIES
} from './action.types';

export const getAvaliableCurrencies = () => dispatch => {
  dispatch({ type: GET_AVALIABLE_CURRENCIES, payload: {} });
}