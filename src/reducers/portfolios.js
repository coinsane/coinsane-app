import Store from '../store/portfolios';

export const initialState = Store;

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case 'WATCHLIST_REPLACE': {
      return {
        ...state,
        watchlist: action.data || [],
      };
    }
    case 'PORTFOLIOS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        portfolios: action.data,
      };
    }
    case 'PORTFOLIOS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    default:
      return state;
  }
}
