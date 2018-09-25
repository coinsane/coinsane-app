import _ from 'lodash';
import { marketsActions } from 'src/actions';
import { IMarketState } from 'src/models';

export const initialState: IMarketState = {
  loading: true,
  error: null,
  refreshing: false,
  items: {},
  list: [],
  cap: {
    loading: true,
    error: null,
  },
  searchTerm: '',
  count: 0,
  cache: {},
};

export default (
  state: IMarketState = initialState,
  action: marketsActions.IMarketAction,
): IMarketState => {
  switch (action.type) {
    case marketsActions.ActionTypes.GET_MARKET_CAP: {
      return {
        ...state,
        cap: {
          ...state.cap,
          error: null,
          loading: true,
        },
      };
    }
    case marketsActions.ActionTypes.GET_MARKET_CAP_SUCCESS: {
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
    case marketsActions.ActionTypes.GET_MARKET_CAP_ERROR: {
      return {
        ...state,
        cap: {
          ...state.cap,
          error: true,
          loading: false,
        },
      };
    }
    case marketsActions.ActionTypes.GET_AVAILABLE_MARKETS: {
      return {
        ...state,
        refreshing: action.payload.refreshing,
        error: null,
        loading: true,
      };
    }
    case marketsActions.ActionTypes.GET_AVAILABLE_MARKETS_SUCCESS: {
      const items = { ...state.items };
      const listPayload = action.payload.list.map((market) => {
        // if (action.payload.cached) return market;
        items[market._id] = market;
        return market._id;
      });
      const list = [
        ...(action.payload.skip ? state.list : []),
        ...listPayload,
      ];
      // const cache = { ...state.cache };
      const searchTerm = action.payload.q ? action.payload.q.toLowerCase() : '';
      // const q = searchTerm ? `:${searchTerm}` : '';
      // if (!action.payload.cached) {
      //   const cacheKey = `${action.payload.skip}${q}`;
      //   cache[cacheKey] = listPayload;
      // }
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
    case marketsActions.ActionTypes.UPDATE_MARKETS_CACHE: {
      return {
        ...state,
        items: { ...state.items, ...action.payload },
      };
    }
    case marketsActions.ActionTypes.MARKET_CHART_UPDATE: {
      const { marketId, range, symbol, data } = action.payload;
      const items = { ...state.items };
      if (items[marketId]) {
        if (!items[marketId].chart) items[marketId].chart = {};
        let first = 0;
        const dataNoZero = [];
        const dataArr = Object.keys(data).map((key) => {
          if (!first && data[key] !== 0) first = data[key];
          if (data[key] !== 0) dataNoZero.push(data[key]);
          return data[key];
        });

        const last = dataArr[dataArr.length - 1];
        const subtract = _.subtract(first, last);
        const divide = _.divide(subtract, first);
        const pct = _.multiply(divide, -100);
        items[marketId].chart[`${range}:${symbol}`] = {
          data,
          high: _.max(dataNoZero),
          low: _.min(dataNoZero),
          pct,
        };
      }
      return {
        ...state,
        items,
      };
    }
    case marketsActions.ActionTypes.MARKET_DATA_COLLAPSE: {
      const { marketId, collapse } = action.payload;
      const items = { ...state.items };
      if (items[marketId]) {
        if (!items[marketId].collapsed) items[marketId].collapsed = [];
        if (items[marketId].collapsed.indexOf(collapse) === -1) items[marketId].collapsed.push(collapse);
        else items[marketId].collapsed.splice(items[marketId].collapsed.indexOf(collapse), 1);
      }
      return {
        ...state,
        items,
      };
    }
    case marketsActions.ActionTypes.GET_AVAILABLE_MARKETS_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
        refreshing: false,
        list: [],
      };
    }
    case marketsActions.ActionTypes.SEARCH_AVAILABLE_MARKETS: {
      const list = action.payload.skip ? state.list : [];
      return {
        ...state,
        error: null,
        loading: true,
        list,
      };
    }
    case marketsActions.ActionTypes.SEARCH_AVAILABLE_MARKETS_SUCCESS: {
      const items = { ...state.items };
      const { count } = action.payload;
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
        count,
      };
    }
    case marketsActions.ActionTypes.SEARCH_AVAILABLE_MARKETS_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
        list: [],
      };
    }
    case marketsActions.ActionTypes.EXCHANGES_UPDATE: {
      const { marketId } = action.payload;
      const items = { ...state.items };
      if (!items[marketId].exchanges) items[marketId].exchanges = {};
      items[marketId].exchanges.loading = true;
      items[marketId].exchanges.page = 0;
      return {
        ...state,
        items,
      };
    }
    case marketsActions.ActionTypes.EXCHANGES_UPDATE_SUCCESS: {
      const { marketId, exchanges } = action.payload;
      const items = { ...state.items };
      if (items[marketId]) {
        if (!items[marketId].exchanges) items[marketId].exchanges = {};
        items[marketId].exchanges.list = _.chunk(exchanges, 5);
        items[marketId].exchanges.count = items[marketId].exchanges.list.length;
        items[marketId].exchanges.loading = false;
      }
      return {
        ...state,
        items,
      };
    }
    case marketsActions.ActionTypes.EXCHANGES_LOAD_MORE: {
      const { marketId } = action.payload;
      const items = { ...state.items };
      items[marketId].exchanges.page += 1;
      return {
        ...state,
        items,
      };
    }
    case marketsActions.ActionTypes.CLEAR_MARKETS: {
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
};
