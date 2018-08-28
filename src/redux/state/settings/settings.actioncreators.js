import {
  GET_SETTINGS,
  SELECT_CURRENCY,
  HIDE_ONBOARDING,
  UPDATE_CURRENCIES,
} from '../../actions/action.types';

/**
  * Get User Settings
  */
export const getSettings = () => ({ type: GET_SETTINGS });

export const selectCurrency = payload => ({ type: SELECT_CURRENCY, payload });

export const hideOnboarding = payload => ({ type: HIDE_ONBOARDING, payload });

export const updateCurrencies = payload => ({ type: UPDATE_CURRENCIES, payload });
