import {
  GET_AVAILABLE_CURRENCIES,
  GET_AVAILABLE_CURRENCIES_SUCCESS,
  GET_AVAILABLE_CURRENCIES_ERROR,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  refreshing: false,
  items: {},
  list: [],
  searchTerm: '',
  count: 0,
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABLE_CURRENCIES: {
      return {
        ...state,
        refreshing: action.payload.refreshing,
        error: null,
        loading: true,
      };
    }
    case GET_AVAILABLE_CURRENCIES_SUCCESS: {
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
    case GET_AVAILABLE_CURRENCIES_ERROR: {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
        refreshing: false,
        list: [],
      };
    }
    default:
      return state;
  }
}
