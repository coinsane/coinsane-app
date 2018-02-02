import Store from '../store/coins';

export const initialState = Store;

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case 'COINS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.data,
      };
    }
    case 'COINS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    default:
      return state;
  }
}
