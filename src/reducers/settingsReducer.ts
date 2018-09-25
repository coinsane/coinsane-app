import { settingsActions } from 'src/actions';
import { ISettingsState } from 'src/models';

export const initialState: ISettingsState = {
  loading: true,
  error: null,
  currencies: {},
  currency: 'USD',
  periods: ['1h', '1d', '1w', '1m', '3m', '6m', '1y'],
  onboarding: true,
};

export default (
  state: ISettingsState = initialState,
  action: settingsActions.ISettingsAction,
): ISettingsState => {
  switch (action.type) {
    case settingsActions.ActionTypes.GET_SETTINGS_SUCCEED: {
      return {
        ...state,
        error: null,
        loading: false,
        currencies: action.payload && action.payload.currencies,
      };
    }
    case settingsActions.ActionTypes.SELECT_CURRENCY_SUCCESS: {
      return {
        ...state,
        currency: action.payload,
      };
    }
    case settingsActions.ActionTypes.UPDATE_CURRENCIES: {
      return {
        ...state,
        error: null,
        loading: true,
        // currencies: action.payload,
      };
    }
    case settingsActions.ActionTypes.UPDATE_CURRENCIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        currencies: action.payload,
      };
    }
    case settingsActions.ActionTypes.UPDATE_CURRENCIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case settingsActions.ActionTypes.HIDE_ONBOARDING: {
      return {
        ...state,
        onboarding: false,
      };
    }
    default:
      return state;
  }
};
