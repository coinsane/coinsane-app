import {
  GET_SETTINGS_SUCCEED,
  SELECT_CURRENCY_SUCCESS,
  HIDE_ONBOARDING,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  currencies: {},
  currency: 'USD',
  periods: ['1h', '1d', '1w', '1m', '3m', '6m', '1y'],
  onboarding: true,
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
    case HIDE_ONBOARDING: {
      return {
        ...state,
        onboarding: false,
      };
    }
    default:
      return state;
  }
}
