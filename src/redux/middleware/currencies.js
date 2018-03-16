import { apiRequest } from '../../actions/api';
import { 
  GET_AVALIABLE_CURRENCIES,
  GET_AVALIABLE_CURRENCIES_SUCCESS,
  GET_AVALIABLE_CURRENCIES_ERROR
} from '../../actions/action.types';

export const currenciesActionsFlow = ({dispatch}) => next => action => {
  next(action);
  if (action.type === GET_AVALIABLE_CURRENCIES) {
    dispatch(apiRequest('GET', '/search?type=currency&limit=10', null, GET_AVALIABLE_CURRENCIES_SUCCESS, GET_AVALIABLE_CURRENCIES_ERROR));
  }
};