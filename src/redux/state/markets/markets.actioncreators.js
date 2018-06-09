import {
  GET_AVAILABLE_MARKETS,
  SEARCH_AVAILABLE_MARKETS,
  CLEAR_MARKETS,
  GET_MARKET_CAP,
  MARKET_DATA_COLLAPSE,
} from '../../actions/action.types';

export const updateCollapsed = payload => ({ type: MARKET_DATA_COLLAPSE, payload });

/**
  * Get Market Cap
  */
export const getMarketCap = payload => ({
  type: GET_MARKET_CAP,
  payload,
});

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
export const changeSearchTerm = ({ q, limit = 10, skip = 0, refreshing = false }) => ({
  type: SEARCH_AVAILABLE_MARKETS,
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
