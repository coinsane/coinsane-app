import { apiRequest } from '../../actions/api';
import {
  GET_COURSE,
  GET_COURSE_SUCCESS,
  GET_COURSE_ERROR,
  SEARCH_AVAILABLE_MARKETS,
  SEARCH_AVAILABLE_MARKETS_SUCCESS,
  SEARCH_AVAILABLE_MARKETS_ERROR,
  GET_AVAILABLE_MARKETS,
  GET_AVAILABLE_MARKETS_SUCCESS,
  GET_AVAILABLE_MARKETS_ERROR,
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_ERROR
} from '../../actions/action.types';

export const coinsActionsFlow = ({dispatch}) => next => action => {
  next(action);
  if (action.type === GET_AVAILABLE_MARKETS) {
    dispatch(apiRequest('GET', '/market?limit=10', null, GET_AVAILABLE_MARKETS_SUCCESS, GET_AVAILABLE_MARKETS_ERROR));
  }

  if (action.type === SEARCH_AVAILABLE_MARKETS) {
    dispatch(apiRequest('GET', `/search?type=market&q=${action.payload}`, null, SEARCH_AVAILABLE_MARKETS_SUCCESS, SEARCH_AVAILABLE_MARKETS_ERROR));
  }

  if (action.type === GET_COURSE) {
    dispatch(apiRequest('GET', `/price?fsym=${action.payload.from}&tsyms=${action.payload.to}`, null, GET_COURSE_SUCCESS, GET_COURSE_ERROR));
  }

  // if (action.type === ADD_TRANSACTION) {
  //   dispatch(apiRequest('POST', '/coins', action.payload, ADD_TRANSACTION_SUCCESS, ADD_TRANSACTION_ERROR));
  // }
};
