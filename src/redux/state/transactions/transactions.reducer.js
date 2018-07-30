import moment from 'moment';
import {
  TRANSACTIONS_ADD,
  TRANSACTIONS_ADD_SUCCESS,
  TRANSACTIONS_ADD_ERROR,
  UPDATE_TRANSACTIONS_ITEMS,
  GET_TRANSACTIONS_SUCCESS,
  GET_AVAILABLE_TRANSACTIONS,
  GET_TRANSACTION_PRICE_SUCCESS,
  CLEAR_DRAFT_TRANSACTION,
  UPDATE_DRAFT_TRANSACTION_SUCCESS,
  TRANSACTIONS_REMOVE,
  TRANSACTIONS_REMOVE_SUCCESS,
} from '../../actions/action.types';

export const initialState = {
  loading: false,
  error: null,
  refreshing: false,
  list: [],
  items: {},
  draft: {
    coin: null,
    portfolio: null,
    market: null,
    currency: null,
    type: 'buy',
    price: 0,
    amount: 0,
    total: 0,
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm'),
    category: '',
    note: '',
    deduct: true,
  },
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DRAFT_TRANSACTION_SUCCESS: {
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
    // case TRANSACTIONS_REMOVE: {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // }
    case TRANSACTIONS_REMOVE_SUCCESS: {
      return {
        ...state,
        loading: false,
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
      const items = { ...state.items };
      action.payload.forEach((item) => {
        items[item._id] = item;
      });
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
