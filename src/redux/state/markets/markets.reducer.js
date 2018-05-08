import {
  GET_AVAILABLE_MARKETS,
  GET_AVAILABLE_MARKETS_SUCCESS,
  GET_AVAILABLE_MARKETS_ERROR,
  SEARCH_AVAILABLE_MARKETS,
  SEARCH_AVAILABLE_MARKETS_SUCCESS,
  SEARCH_AVAILABLE_MARKETS_ERROR,
  CLEAR_MARKETS,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: [],
};

export default function marketsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABLE_MARKETS: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case GET_AVAILABLE_MARKETS_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload,
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
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload,
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
