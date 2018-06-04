import _ from 'lodash';
import {
  GET_AVAILABLE_MARKETS,
  GET_AVAILABLE_MARKETS_SUCCESS,
  GET_AVAILABLE_MARKETS_ERROR,
  SEARCH_AVAILABLE_MARKETS,
  SEARCH_AVAILABLE_MARKETS_SUCCESS,
  SEARCH_AVAILABLE_MARKETS_ERROR,
  CLEAR_MARKETS,
  GET_MARKET_CAP,
  GET_MARKET_CAP_SUCCESS,
  GET_MARKET_CAP_ERROR,
  UPDATE_MARKETS_CACHE,
  MARKET_CHART_UPDATE,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  refreshing: false,
  list: [],
  cap: {
    loading: true,
    error: null,
  },
  searchTerm: '',
  count: 0,
  items: {},
  cache: {},
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MARKET_CAP: {
      return {
        ...state,
        cap: {
          ...state.cap,
          error: null,
          loading: true,
        },
      };
    }
    case GET_MARKET_CAP_SUCCESS: {
      return {
        ...state,
        cap: {
          ...state.cap,
          ...action.payload,
          error: null,
          loading: false,
        },
      };
    }
    case GET_MARKET_CAP_ERROR: {
      return {
        ...state,
        cap: {
          ...state.cap,
          error: true,
          loading: false,
        },
      };
    }
    case GET_AVAILABLE_MARKETS: {
      return {
        ...state,
        refreshing: action.payload.refreshing,
        error: null,
        loading: true,
      };
    }
    case GET_AVAILABLE_MARKETS_SUCCESS: {
      const items = { ...state.items };
      const listPayload = action.payload.list.map((market) => {
        if (action.payload.cached) return market;
        items[market._id] = market;
        return market._id;
      });
      const list = [
        ...(action.payload.skip ? state.list : []),
        ...listPayload,
      ];
      const cache = { ...state.cache };
      const searchTerm = action.payload.q ? action.payload.q.toLowerCase() : '';
      const q = searchTerm ? `:${searchTerm}` : '';
      if (!action.payload.cached) {
        const cacheKey = `${action.payload.skip}${q}`;
        cache[cacheKey] = listPayload;
      }
      const count = action.payload.count ? action.payload.count : null;
      return {
        ...state,
        error: null,
        loading: false,
        refreshing: false,
        searchTerm,
        list,
        items,
        cache: {},
        count,
      };
    }
    case UPDATE_MARKETS_CACHE: {
      return {
        ...state,
        items: { ...state.items, ...action.payload },
      };
    }
    case MARKET_CHART_UPDATE: {
      const { market, range, symbol, data } = action.payload;
      const items = { ...state.items };
      if (items[market]) {
        if (!items[market].chart) items[market].chart = {};
        const dataArr = Object.keys(data).map(key => data[key]);
        const first = dataArr[0];
        const last = dataArr[dataArr.length - 1];
        const subtract = _.subtract(first, last);
        const divide = _.divide(subtract, first);
        const pct = _.multiply(divide, -100);
        items[market].chart[`${range}:${symbol}`] = {
          data,
          high: _.max(dataArr),
          low: _.min(dataArr),
          pct,
        };
      }
      return {
        ...state,
        items,
      };
    }
    case GET_AVAILABLE_MARKETS_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
        refreshing: false,
        list: [],
      };
    }
    case SEARCH_AVAILABLE_MARKETS: {
      const list = action.payload.skip ? state.list : [];
      return {
        ...state,
        error: null,
        loading: true,
        list,
      };
    }
    case SEARCH_AVAILABLE_MARKETS_SUCCESS: {
      const items = { ...state.items };
      const list = action.payload.list.map((market) => {
        items[market._id] = market;
        return market._id;
      });
      return {
        ...state,
        error: null,
        loading: false,
        list,
        items,
      };
    }
    case SEARCH_AVAILABLE_MARKETS_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
        list: [],
      };
    }
    case CLEAR_MARKETS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: [],
      };
    }
    default:
      return state;
  }
}
