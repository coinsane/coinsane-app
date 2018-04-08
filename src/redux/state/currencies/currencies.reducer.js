import {
  GET_AVALIABLE_CURRENCIES_SUCCESS,
  UPDATE_CURRENT_CURRENCY
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
    case GET_AVALIABLE_CURRENCIES_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload.response.result,
      };
    }
    case UPDATE_CURRENT_CURRENCY: {
      return {
        ...state,
        current: action.payload,
      };
    }
    default:
      return state;
  }
}
