import { currency as currencyActions } from 'src/actions';
import { ICurrencyState } from 'src/models';

export const initialState: ICurrencyState = {
  loading: true,
  error: null,
  refreshing: false,
  items: {},
  list: [],
  searchTerm: '',
  count: 0,
};

export default (
  state: ICurrencyState = initialState,
  action: currencyActions.ICurrencyAction,
): ICurrencyState => {
  switch (action.type) {
    case currencyActions.ActionTypes.GET_AVAILABLE_CURRENCIES: {
      return {
        ...state,
        refreshing: action.payload.refreshing,
        error: null,
        loading: true,
      };
    }
    case currencyActions.ActionTypes.GET_AVAILABLE_CURRENCIES_SUCCESS: {
      const items = { ...state.items };
      const listPayload = action.payload.list.map((market) => {
        items[market._id] = market;
        return market._id;
      });
      const list = [
        ...(action.payload.skip ? state.list : []),
        ...listPayload,
      ];
      const searchTerm = action.payload.q ? action.payload.q.toLowerCase() : '';
      const count = action.payload.count ? action.payload.count : null;
      return {
        ...state,
        error: null,
        loading: false,
        refreshing: false,
        items,
        list,
        searchTerm,
        count,
      };
    }
    case currencyActions.ActionTypes.GET_AVAILABLE_CURRENCIES_ERROR: {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
        refreshing: false,
        list: [],
      };
    }
    case currencyActions.ActionTypes.SEARCH_AVAILABLE_CURRENCIES: {
      const list = action.payload.skip ? state.list : [];
      return {
        ...state,
        error: null,
        loading: true,
        list,
      };
    }
    case currencyActions.ActionTypes.SEARCH_AVAILABLE_CURRENCIES_SUCCESS: {
      const items = { ...state.items };
      const { count } = action.payload;
      const list = action.payload.list.map((currency) => {
        items[currency._id] = currency;
        return currency._id;
      });
      return {
        ...state,
        error: null,
        loading: false,
        list,
        items,
        count,
      };
    }
    case currencyActions.ActionTypes.SEARCH_AVAILABLE_CURRENCIES_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
        list: [],
      };
    }
    default:
      return state;
  }
};
