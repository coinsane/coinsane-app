import { apiRequest } from '../../actions/api';
import { 
  GET_COURSE,
  GET_COURSE_SUCCESS,
  GET_COURSE_ERROR,
  SEARCH_AVALIABLE_MARKETS,
  GET_SEARCHED_MARKETS_SUCCESS,
  GET_SEARCHED_MARKETS_ERROR,
  GET_AVALIABLE_MARKETS,
  GET_AVALIABLE_MARKETS_SUCCESS,
  GET_AVALIABLE_MARKETS_ERROR,
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_ERROR
} from '../../actions/action.types';

export const coinsActionsFlow = ({dispatch}) => next => action => {
  next(action);
  if (action.type === GET_AVALIABLE_MARKETS) {
    dispatch(apiRequest('GET', '/market?limit=10', null, GET_AVALIABLE_MARKETS_SUCCESS, GET_AVALIABLE_MARKETS_ERROR));
  }
  
  if (action.type === SEARCH_AVALIABLE_MARKETS) {
    dispatch(apiRequest('GET', `/search?type=market&q=${action.payload}`, null, GET_SEARCHED_MARKETS_SUCCESS, GET_SEARCHED_MARKETS_ERROR));
  }
  
  if (action.type === GET_COURSE) {
    dispatch(apiRequest('GET', `/price?fsym=${action.payload.from}&tsyms=${action.payload.to}`, null, GET_COURSE_SUCCESS, GET_COURSE_ERROR));
  }
  
  if (action.type === ADD_TRANSACTION) {
    dispatch(apiRequest('POST', `/coins`, action.payload, ADD_TRANSACTION_SUCCESS, ADD_TRANSACTION_ERROR));
  }
};