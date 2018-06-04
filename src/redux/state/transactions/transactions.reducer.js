import {
  TRANSACTIONS_ADD,
  TRANSACTIONS_ADD_SUCCESS,
  TRANSACTIONS_ADD_ERROR,
  UPDATE_TRANSACTIONS_ITEMS,
  GET_TRANSACTIONS_SUCCESS,
  GET_AVAILABLE_TRANSACTIONS,
  UPDATE_DRAFT_TRANSACTION,
  GET_TRANSACTION_PRICE_SUCCESS, CLEAR_DRAFT_TRANSACTION,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  refreshing: false,
  list: [],
  items: {},
  draft: {
    coin: null,
    portfolio: null,
    market: null,
    currency: null,
    buy: true,
    price: 0,
    amount: 0,
    total: 0,
    date: new Date(),
    time: '00:00',
    category: '',
    note: '',
  },
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DRAFT_TRANSACTION: {
      const { create, ...payload } = action.payload;
      let draft = { ...payload };
      if (!create) draft = { ...state.draft, ...draft };
      return {
        ...state,
        draft,
      };
    }
    case GET_TRANSACTION_PRICE_SUCCESS: {
      const draft = { ...state.draft, price: action.payload };
      return {
        ...state,
        draft,
      };
    }
    case CLEAR_DRAFT_TRANSACTION: {
      return {
        ...state,
        draft: initialState.draft,
      };
    }
    case TRANSACTIONS_ADD: {
      return {
        ...state,
        loading: true,
      };
    }
    case TRANSACTIONS_ADD_SUCCESS: {
      const items = { ...state.items, ...action.payload };
      return {
        ...state,
        loading: false,
        items,
      };
    }
    case TRANSACTIONS_ADD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_AVAILABLE_TRANSACTIONS: {
      const { refreshing = false } = action.payload;
      return {
        ...state,
        loading: true,
        refreshing,
      };
    }
    case UPDATE_TRANSACTIONS_ITEMS: {
      const { transactions } = action.payload;
      const items = { ...state.items };
      if (transactions.length) {
        transactions.forEach((item) => {
          items[item._id] = item;
        });
      }
      return {
        ...state,
        loading: false,
        items,
      };
    }
    case GET_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        refreshing: false,
      };
    }
    default:
      return state;
  }
}
