import {
  GET_AVAILABLE_MARKETS,
  SEARCH_AVAILABLE_MARKETS,
  GET_AVAILABLE_CURRENCIES,
  CLEAR_MARKETS,
} from '../../actions/action.types';

/**
  * Get All Markets
  */
export function getAvailableMarkets() {
  return {
    type: GET_AVAILABLE_MARKETS,
    payload: { limit: 10 },
  };
}
/**
  * Get All Markets
  */
export function getAvailableCurrencies() {
  return {
    type: GET_AVAILABLE_CURRENCIES,
    payload: { limit: 10 },
  };
}

/**
  * Search for market
  */
export function changeSearchTerm(term) {
  return {
    type: SEARCH_AVAILABLE_MARKETS,
    payload: term,
  };
}

/**
  * Clear markets result
  */
export function clearMarkets() {
  return {
    type: CLEAR_MARKETS,
  };
}