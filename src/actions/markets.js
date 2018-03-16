import { 
  GET_AVALIABLE_MARKETS,
  SEARCH_AVALIABLE_MARKETS,
  CLEAR_MARKETS
} from './action.types';

/**
  * Get All Markets
  */
export function getAvaliableMarkets() {
  return {
    type: GET_AVALIABLE_MARKETS
  };
}

/**
  * Search for market
  */
export function changeSearchTerm(term) {
  return {
    type: SEARCH_AVALIABLE_MARKETS,
    payload: term
  };
}

/**
  * Clear markets result
  */
export function clearMarkets() {
  return {
    type: CLEAR_MARKETS
  };
}