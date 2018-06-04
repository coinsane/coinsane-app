import {
  COIN_HISTO_UPDATE_SUCCESS,
  COIN_MARKETS_UPDATE_SUCCESS,
  COINS_ERROR,
  GET_AVAILABLE_TRANSACTIONS,
  GET_AVAILABLE_TRANSACTIONS_ERROR,
  UPDATE_COINS_CACHE,
  UPDATE_COINS_PERIOD,
  UPDATE_COIN_TRANSACTIONS,
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
  period: '1d',
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COIN_TRANSACTIONS: {
      const { coinId, transactions } = action.payload;
      const items = { ...state.items };
      if (items[coinId]) {
        items[coinId].transactions = transactions.map(transaction => transaction._id);
      }
      return {
        ...state,
        items,
      };
    }
    case UPDATE_COINS_PERIOD: {
      return {
        ...state,
        period: action.payload,
      };
    }
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
        list: action.payload,
      };
    }
    case GET_AVAILABLE_TRANSACTIONS: {
      return {
        ...state,
        transactionsError: null,
        transactionsLoading: true,
      };
    }
    // case GET_AVAILABLE_TRANSACTIONS_SUCCESS: {
    //   return {
    //     ...state,
    //     transactionsError: null,
    //     transactionsLoading: false,
    //     transactions: action.payload,
    //   };
    // }
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
