import {
  COIN_HISTO_UPDATE_SUCCESS,
  COIN_MARKETS_UPDATE_SUCCESS,
  COINS_ERROR,
  GET_AVAILABLE_TRANSACTIONS,
  GET_AVAILABLE_TRANSACTIONS_SUCCESS,
  GET_AVAILABLE_TRANSACTIONS_ERROR,
  UPDATE_COINS_CACHE,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: {},
  items: {},
  transactions: [],
  transactionsLoading: true,
  transactionsError: null,
  markets: [],
  marketsLoading: true,
  marketsError: null,
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COINS_CACHE: {
      return {
        ...state,
        items: { ...state.items, ...action.payload },
      };
    }
    case COIN_HISTO_UPDATE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload.data,
      };
    }
    case GET_AVAILABLE_TRANSACTIONS: {
      return {
        ...state,
        transactionsError: null,
        transactionsLoading: true,
      };
    }
    case GET_AVAILABLE_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        transactionsError: null,
        transactionsLoading: false,
        transactions: action.payload,
      };
    }
    case GET_AVAILABLE_TRANSACTIONS_ERROR: {
      return {
        ...state,
        transactionsError: action.payload,
        transactionsLoading: false,
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
