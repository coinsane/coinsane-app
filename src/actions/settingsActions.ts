import { AnyAction } from 'redux';

export enum ActionTypes {
  GET_SETTINGS = 'settings/GET_SETTINGS',
  GET_SETTINGS_SUCCEED = 'settings/GET_SETTINGS_SUCCEED',
  GET_SETTINGS_ERROR = 'settings/GET_SETTINGS_ERROR',
  SELECT_CURRENCY = 'settings/SELECT_CURRENCY',
  SELECT_CURRENCY_SUCCESS = 'settings/SELECT_CURRENCY_SUCCESS',
  HIDE_ONBOARDING = 'settings/HIDE_ONBOARDING',
  UPDATE_CURRENCIES = 'settings/UPDATE_CURRENCIES',
  UPDATE_CURRENCIES_SUCCESS = 'settings/UPDATE_CURRENCIES_SUCCESS',
  UPDATE_CURRENCIES_ERROR = 'settings/UPDATE_CURRENCIES_ERROR',
}

export interface ISettingsAction extends AnyAction {
  payload: any;
  type: ActionTypes.GET_SETTINGS
    | ActionTypes.GET_SETTINGS_SUCCEED
    | ActionTypes.GET_SETTINGS_ERROR
    | ActionTypes.SELECT_CURRENCY
    | ActionTypes.SELECT_CURRENCY_SUCCESS
    | ActionTypes.HIDE_ONBOARDING
    | ActionTypes.UPDATE_CURRENCIES
    | ActionTypes.UPDATE_CURRENCIES_SUCCESS
    | ActionTypes.UPDATE_CURRENCIES_ERROR
    ;
}

export const getSettings = () => ({ type: ActionTypes.GET_SETTINGS });

export const selectCurrency = payload => ({ type: ActionTypes.SELECT_CURRENCY, payload });

export const hideOnboarding = payload => ({ type: ActionTypes.HIDE_ONBOARDING, payload });

export const updateCurrencies = payload => ({ type: ActionTypes.UPDATE_CURRENCIES, payload });
