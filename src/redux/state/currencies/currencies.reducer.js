import {
  GET_AVAILABLE_CURRENCIES_SUCCESS,
  SELECT_CURRENCY_SUCCESS,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: [],
  active: ['BTC', 'USD', 'RUB'],
  current: 'BTC',
};

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABLE_CURRENCIES_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload,
      };
    }
    case SELECT_CURRENCY_SUCCESS: {
      return {
        ...state,
        current: action.payload,
      };
    }
    default:
      return state;
  }
}
