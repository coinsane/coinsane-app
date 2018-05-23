import {
  GET_SETTINGS,
  SELECT_CURRENCY,
} from '../../actions/action.types';

/**
  * Get User Settings
  */
export const getSettings = () => ({ type: GET_SETTINGS });

export const selectCurrency = payload => ({ type: SELECT_CURRENCY, payload });
