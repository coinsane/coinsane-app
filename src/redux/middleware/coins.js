import { apiRequest } from '../../actions/api';
import { API_GET_AVALIABLE_COINS, GET_AVALIABLE_COINS_SUCCESS, GET_AVALIABLE_COINS_ERROR } from '../../actions/action.types';

export const coinsActionsFlow = ({dispatch}) => next => action => {
  next(action);
  if (action.type === API_GET_AVALIABLE_COINS) {
    dispatch(apiRequest('GET', '/market?limit=10', null, GET_AVALIABLE_COINS_SUCCESS, GET_AVALIABLE_COINS_ERROR));
  }

};