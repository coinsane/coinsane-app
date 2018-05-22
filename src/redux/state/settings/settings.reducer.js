import {
  GET_SETTINGS_SUCCEED,
  SELECT_CURRENCY_SUCCESS,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  currencies: {},
  currency: 'BTC',
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SETTINGS_SUCCEED: {
      return {
        ...state,
        error: null,
        loading: false,
        currencies: action.payload.currencies,
      };
    }
    case SELECT_CURRENCY_SUCCESS: {
      return {
        ...state,
        currency: action.payload,
      };
    }
    default:
      return state;
  }
}
