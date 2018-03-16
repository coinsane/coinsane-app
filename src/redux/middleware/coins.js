import { apiRequest } from '../../actions/api';
import { SEARCH_AVALIABLE_COINS, GET_SEARCHED_COINS_SUCCESS, GET_SEARCHED_COINS_ERROR, GET_AVALIABLE_COINS, GET_AVALIABLE_COINS_SUCCESS, GET_AVALIABLE_COINS_ERROR } from '../../actions/action.types';

export const coinsActionsFlow = ({dispatch}) => next => action => {
  next(action);
  if (action.type === GET_AVALIABLE_COINS) {
    dispatch(apiRequest('GET', '/market?limit=10', null, GET_AVALIABLE_COINS_SUCCESS, GET_AVALIABLE_COINS_ERROR));
  }
  
  if (action.type === SEARCH_AVALIABLE_COINS) {
    dispatch(apiRequest('GET', `/search?type=market&q=${action.payload}`, null, GET_SEARCHED_COINS_SUCCESS, GET_SEARCHED_COINS_ERROR));
  }

};