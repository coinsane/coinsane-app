import { AnyAction } from 'redux';

export enum ActionTypes {
  GET_AVAILABLE_MARKETS = 'market/GET_AVAILABLE_MARKETS',
  GET_AVAILABLE_MARKETS_SUCCESS = 'market/GET_AVAILABLE_MARKETS_SUCCESS',
  GET_AVAILABLE_MARKETS_ERROR = 'market/GET_AVAILABLE_MARKETS_ERROR',
  SEARCH_AVAILABLE_MARKETS = 'market/SEARCH_AVAILABLE_MARKETS',
  SEARCH_AVAILABLE_MARKETS_SUCCESS = 'market/SEARCH_AVAILABLE_MARKETS_SUCCESS',
  SEARCH_AVAILABLE_MARKETS_ERROR = 'market/SEARCH_AVAILABLE_MARKETS_ERROR',
  CLEAR_MARKETS = 'market/CLEAR_MARKETS',
  GET_MARKET_CAP = 'market/GET_MARKET_CAP',
  GET_MARKET_CAP_SUCCESS = 'market/GET_MARKET_CAP_SUCCESS',
  GET_MARKET_CAP_ERROR = 'market/GET_MARKET_CAP_ERROR',
  MARKET_DATA_COLLAPSE = 'market/MARKET_DATA_COLLAPSE',
  EXCHANGES_UPDATE = 'market/EXCHANGES_UPDATE',
  EXCHANGES_UPDATE_SUCCESS = 'market/EXCHANGES_UPDATE_SUCCESS',
  EXCHANGES_UPDATE_ERROR = 'market/EXCHANGES_UPDATE_ERROR',
  EXCHANGES_LOAD_MORE = 'market/EXCHANGES_LOAD_MORE',
  SEARCH_AVAILABLE_CURRENCIES = 'market/SEARCH_AVAILABLE_CURRENCIES',
  UPDATE_MARKETS_CACHE = 'market/UPDATE_MARKETS_CACHE',
  MARKET_CHART_UPDATE = 'market/MARKET_CHART_UPDATE',
}

export interface IMarketAction extends AnyAction {
  payload: any;
  type: ActionTypes.GET_AVAILABLE_MARKETS
    | ActionTypes.GET_AVAILABLE_MARKETS_SUCCESS
    | ActionTypes.GET_AVAILABLE_MARKETS_ERROR
    | ActionTypes.SEARCH_AVAILABLE_MARKETS
    | ActionTypes.SEARCH_AVAILABLE_MARKETS_SUCCESS
    | ActionTypes.SEARCH_AVAILABLE_MARKETS_ERROR
    | ActionTypes.CLEAR_MARKETS
    | ActionTypes.GET_MARKET_CAP
    | ActionTypes.GET_MARKET_CAP_SUCCESS
    | ActionTypes.GET_MARKET_CAP_ERROR
    | ActionTypes.MARKET_DATA_COLLAPSE
    | ActionTypes.EXCHANGES_UPDATE
    | ActionTypes.EXCHANGES_UPDATE_SUCCESS
    | ActionTypes.EXCHANGES_UPDATE_ERROR
    | ActionTypes.EXCHANGES_LOAD_MORE
    | ActionTypes.SEARCH_AVAILABLE_CURRENCIES
    | ActionTypes.UPDATE_MARKETS_CACHE
    | ActionTypes.MARKET_CHART_UPDATE
    ;
}

export const updateCollapsed = payload => ({ type: ActionTypes.MARKET_DATA_COLLAPSE, payload });

export const getExchanges = payload => ({ type: ActionTypes.EXCHANGES_UPDATE, payload });

export const loadMoreExchanges = payload => ({ type: ActionTypes.EXCHANGES_LOAD_MORE, payload });

export const getMarketCap = payload => ({ type: ActionTypes.GET_MARKET_CAP, payload });

export const getAvailableMarkets = ({ limit = 10, skip = 0, refreshing = false }) => ({
  type: ActionTypes.GET_AVAILABLE_MARKETS,
  payload: { limit, skip, refreshing },
});

export const changeSearchTerm = ({ q = '', limit = 10, skip = 0, refreshing = false }) => ({
  type: ActionTypes.SEARCH_AVAILABLE_MARKETS,
  payload: { q, limit, skip, refreshing },
});

export const currencySearch = ({ q = '', limit = 10, skip = 0, refreshing = false }) => ({
  type: ActionTypes.SEARCH_AVAILABLE_CURRENCIES,
  payload: { q, limit, skip, refreshing },
});

export function clearMarkets () {
  return {
    type: ActionTypes.CLEAR_MARKETS,
  };
}
