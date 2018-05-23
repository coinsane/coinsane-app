import {
  GET_AVAILABLE_CURRENCIES_SUCCESS,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: [],
  active: ['BTC', 'USD', 'RUB'],
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABLE_CURRENCIES_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload,
      };
    }
    default:
      return state;
  }
}
