import moment from 'moment';
import { transactionsActions } from 'src/actions';
import { ITransactionState } from 'src/models';

export const initialState: ITransactionState = {
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

export default (
  state: ITransactionState = initialState,
  action: transactionsActions.ITransactionAction,
): ITransactionState => {
  switch (action.type) {
    case transactionsActions.ActionTypes.UPDATE_DRAFT_TRANSACTION_SUCCESS: {
      const { create, ...payload } = action.payload;
      let draft = { ...payload };
      if (!create) draft = { ...state.draft, ...draft };
      return {
        ...state,
        draft,
      };
    }
    case transactionsActions.ActionTypes.GET_TRANSACTION_PRICE_SUCCESS: {
      const draft = { ...state.draft, price: action.payload };
      return {
        ...state,
        draft,
      };
    }
    case transactionsActions.ActionTypes.CLEAR_DRAFT_TRANSACTION: {
      return {
        ...state,
        draft: initialState.draft,
      };
    }
    case transactionsActions.ActionTypes.TRANSACTIONS_ADD: {
      return {
        ...state,
        loading: true,
      };
    }
    case transactionsActions.ActionTypes.TRANSACTIONS_ADD_SUCCESS: {
      const items = { ...state.items, ...action.payload };
      return {
        ...state,
        loading: false,
        items,
      };
    }
    case transactionsActions.ActionTypes.TRANSACTIONS_ADD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case transactionsActions.ActionTypes.TRANSACTIONS_REMOVE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case transactionsActions.ActionTypes.GET_AVAILABLE_TRANSACTIONS: {
      const { refreshing = false } = action.payload;
      return {
        ...state,
        loading: true,
        refreshing,
      };
    }
    case transactionsActions.ActionTypes.UPDATE_TRANSACTIONS_ITEMS: {
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
    case transactionsActions.ActionTypes.GET_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        refreshing: false,
      };
    }
    default:
      return state;
  }
};
