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
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  refreshing: false,
  error: null,
  list: [],
  cap: {},
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
        error: null,
        loading: true,
      };
    }
    case GET_MARKET_CAP_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        cap: action.payload,
      };
    }
    case GET_MARKET_CAP_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    case GET_AVAILABLE_MARKETS: {
      return {
        ...state,
        error: null,
        loading: true,
        refreshing: action.payload.refreshing,
      };
    }
    case GET_AVAILABLE_MARKETS_SUCCESS: {
      const items = { ...state.items };
      const listPayload = action.payload.list.map((market) => {
        if (action.payload.cached) return market;
        Object.assign(items, { [market._id]: market });
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
        cache,
        count,
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
        Object.assign(items, { [market._id]: market });
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
