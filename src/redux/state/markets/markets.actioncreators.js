import {
  GET_AVAILABLE_MARKETS,
  SEARCH_AVAILABLE_MARKETS,
  GET_AVAILABLE_CURRENCIES,
  CLEAR_MARKETS,
  GET_MARKET_CAP,
} from '../../actions/action.types';

/**
  * Get Market Cap
  */
export function getMarketCap() {
  return {
    type: GET_MARKET_CAP,
  };
}
/**
  * Get All Markets
  */
export function getAvailableMarkets({ limit = 10, offset = 0 }) {
  return {
    type: GET_AVAILABLE_MARKETS,
    payload: { limit, offset },
  };
}
/**
  * Get All Markets
  */
export function getAvailableCurrencies({ limit = 10, offset = 0 }) {
  return {
    type: GET_AVAILABLE_CURRENCIES,
    payload: { limit, offset },
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
