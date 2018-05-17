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
  error: null,
  list: [],
  cap: {},
  items: {},
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
      };
    }
    case GET_AVAILABLE_MARKETS_SUCCESS: {
      const items = { ...state.markets.items };
      const list = action.payload.map((market) => {
        Object.assign(items, { [`${market._id}`]: market });
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
    case GET_AVAILABLE_MARKETS_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
        list: [],
      };
    }
    case SEARCH_AVAILABLE_MARKETS: {
      return {
        ...state,
        error: null,
        loading: true,
        list: [],
      };
    }
    case SEARCH_AVAILABLE_MARKETS_SUCCESS: {
      const items = { ...state.markets.items };
      const list = action.payload.map((market) => {
        Object.assign(items, { [`${market._id}`]: market });
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
