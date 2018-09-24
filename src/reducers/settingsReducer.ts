import {
  GET_SETTINGS_SUCCEED,
  SELECT_CURRENCY_SUCCESS,
  HIDE_ONBOARDING,
  UPDATE_CURRENCIES,
  UPDATE_CURRENCIES_SUCCESS,
  UPDATE_CURRENCIES_ERROR,
} from '../redux/actions/action.types';

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
        currencies: action.payload && action.payload.currencies,
      };
    }
    case SELECT_CURRENCY_SUCCESS: {
      return {
        ...state,
        currency: action.payload,
      };
    }
    case UPDATE_CURRENCIES: {
      return {
        ...state,
        error: null,
        loading: true,
        // currencies: action.payload,
      };
    }
    case UPDATE_CURRENCIES_SUCCESS: {
      console.log('UPDATE_CURRENCIES_SUCCESS', action.payload)
      return {
        ...state,
        loading: false,
        currencies: action.payload,
      };
    }
    case UPDATE_CURRENCIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
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
