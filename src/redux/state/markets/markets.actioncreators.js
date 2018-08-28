import {
  GET_AVAILABLE_MARKETS,
  SEARCH_AVAILABLE_MARKETS,
  CLEAR_MARKETS,
  GET_MARKET_CAP,
  MARKET_DATA_COLLAPSE,
  EXCHANGES_UPDATE,
  EXCHANGES_LOAD_MORE,
  SEARCH_AVAILABLE_CURRENCIES,
} from '../../actions/action.types';

export const updateCollapsed = payload => ({ type: MARKET_DATA_COLLAPSE, payload });


/**
 * Get markets for particular coin
 */
export const getExchanges = payload => ({ type: EXCHANGES_UPDATE, payload });

export const loadMoreExchanges = payload => ({ type: EXCHANGES_LOAD_MORE, payload });

/**
  * Get Market Cap
  */
export const getMarketCap = payload => ({ type: GET_MARKET_CAP, payload });

/**
  * Get All Markets
  */
export const getAvailableMarkets = ({ limit = 10, skip = 0, refreshing = false }) => ({
  type: GET_AVAILABLE_MARKETS,
  payload: { limit, skip, refreshing },
});

/**
  * Search for market
  */
export const changeSearchTerm = ({ q = '', limit = 10, skip = 0, refreshing = false }) => ({
  type: SEARCH_AVAILABLE_MARKETS,
  payload: { q, limit, skip, refreshing },
});

/**
  * Search for currency
  */
export const currencySearch = ({ q = '', limit = 10, skip = 0, refreshing = false }) => ({
  type: SEARCH_AVAILABLE_CURRENCIES,
  payload: { q, limit, skip, refreshing },
});

/**
  * Clear markets result
  */
export function clearMarkets() {
  return {
    type: CLEAR_MARKETS,
  };
}
