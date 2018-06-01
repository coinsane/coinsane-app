import {
  TRANSACTIONS_ADD,
  TRANSACTIONS_ADD_SUCCESS,
  TRANSACTIONS_ADD_ERROR,
  UPDATE_TRANSACTIONS_ITEMS,
  GET_TRANSACTIONS_SUCCESS, GET_AVAILABLE_TRANSACTIONS,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  refreshing: false,
  list: [],
  items: {},
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTIONS_ADD: {
      return {
        ...state,
        loading: true,
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
    case TRANSACTIONS_ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        items: {
          ...state.items,
          ...action.payload,
        },
      };
    }
    case TRANSACTIONS_ADD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
