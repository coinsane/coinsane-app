import { coin as coinActions } from 'src/actions';
import { ICoinState } from 'src/models';

export const initialState: ICoinState = {
  loading: true,
  refreshing: false,
  error: null,
  list: {},
  items: {},
  transactions: [],
  transactionsLoading: true,
  transactionsError: null,
  markets: [],
  marketsLoading: true,
  marketsError: null,
  period: '1h',
};

export default (
  state: ICoinState = initialState,
  action: coinActions.ICoinAction,
): ICoinState => {
  switch (action.type) {
    case coinActions.ActionTypes.UPDATE_COIN_TRANSACTIONS: {
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
    case coinActions.ActionTypes.COIN_TRANSACTION_REMOVE: {
      const { coinId, transaction } = action.payload;
      const items = { ...state.items };
      if (items[coinId]) {
        const transactionsUpdated = [];
        items[coinId].transactions.forEach((id) => {
          if (id !== transaction._id) transactionsUpdated.push(id);
        });
        items[coinId].transactions = transactionsUpdated;
        items[coinId].amount -= transaction.amount;
      }
      return {
        ...state,
        items,
      };
    }
    case coinActions.ActionTypes.UPDATE_COINS_PERIOD: {
      return {
        ...state,
        period: action.payload,
      };
    }
    case coinActions.ActionTypes.UPDATE_COINS_CACHE: {
      const items = { ...state.items, ...action.payload };
      return {
        ...state,
        items,
      };
    }
    case coinActions.ActionTypes.COIN_HISTO_UPDATE: {
      return {
        ...state,
        error: null,
        loading: true,
        refreshing: action.payload.refreshing || false,
      };
    }
    case coinActions.ActionTypes.COIN_HISTO_UPDATE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        refreshing: false,
        list: action.payload,
      };
    }
    case coinActions.ActionTypes.GET_AVAILABLE_TRANSACTIONS: {
      return {
        ...state,
        transactionsError: null,
        transactionsLoading: true,
      };
    }
    case coinActions.ActionTypes.GET_AVAILABLE_TRANSACTIONS_ERROR: {
      return {
        ...state,
        transactionsError: action.payload,
        transactionsLoading: false,
      };
    }
    case coinActions.ActionTypes.COINS_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    default:
      return state;
  }
};
