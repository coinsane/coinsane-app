import {
  COIN_HISTO_UPDATE_SUCCESS,
  COIN_MARKETS_UPDATE_SUCCESS,
  COINS_ERROR,
  GET_AVAILABLE_TRANSACTIONS_SUCCESS
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: {},
  transactions: [],
  markets: [],
};

export default function coinReducer(state = initialState, action) {
  switch (action.type) {
    case COIN_HISTO_UPDATE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload.data,
      };
    }
    case GET_AVAILABLE_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        transactions: action.payload,
      };
    }
    case COIN_MARKETS_UPDATE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        markets: action.payload,
      };
    }
    case COINS_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    default:
      return state;
  }
}
