import { AnyAction } from 'redux';
import { fetchTotals } from 'src/services/api/portfolios';

export enum ActionTypes {
  UPDATE_PORTFOLIOS = 'portfolio/UPDATE_PORTFOLIOS',
  UPDATE_PORTFOLIOS_SUCCESS = 'portfolio/UPDATE_PORTFOLIOS_SUCCESS',
  UPDATE_PORTFOLIOS_ERROR = 'portfolio/UPDATE_PORTFOLIOS_ERROR',
  TOTALS_REPLACE = 'portfolio/TOTALS_REPLACE',
  PORTFOLIO_SELECT = 'portfolio/PORTFOLIO_SELECT',
  PORTFOLIO_UPDATE = 'portfolio/PORTFOLIO_UPDATE',
  PORTFOLIO_UPDATE_SUCCESS = 'portfolio/PORTFOLIO_UPDATE_SUCCESS',
  PORTFOLIO_UPDATE_ERROR = 'portfolio/PORTFOLIO_UPDATE_ERROR',
  PORTFOLIO_ADD = 'portfolio/PORTFOLIO_ADD',
  PORTFOLIO_ADD_SUCCESS = 'portfolio/PORTFOLIO_ADD_SUCCESS',
  PORTFOLIO_ADD_ERROR = 'portfolio/PORTFOLIO_ADD_ERROR',
  PORTFOLIO_REMOVE = 'portfolio/PORTFOLIO_REMOVE',
  PORTFOLIO_REMOVE_SUCCESS = 'portfolio/PORTFOLIO_REMOVE_SUCCESS',
  PORTFOLIO_REMOVE_ERROR = 'portfolio/PORTFOLIO_REMOVE_ERROR',
  PORTFOLIOS_ERROR = 'portfolio/PORTFOLIOS_ERROR',
  SET_COIN_DATA = 'portfolio/SET_COIN_DATA',
  UPDATE_PERIOD = 'portfolio/UPDATE_PERIOD',
  PORTFOLIO_COLLAPSE = 'portfolio/PORTFOLIO_COLLAPSE',
  UPDATE_PORTFOLIO_CHART = 'portfolio/UPDATE_PORTFOLIO_CHART',
  UPDATE_PORTFOLIO_CHART_SUCCESS = 'portfolio/UPDATE_PORTFOLIO_CHART_SUCCESS',
  UPDATE_PORTFOLIO_CHART_ERROR = 'portfolio/UPDATE_PORTFOLIO_CHART_ERROR',
  UPDATE_PORTFOLIO_PERIOD = 'portfolio/UPDATE_PORTFOLIO_PERIOD',
  UPDATE_PORTFOLIO_PERIOD_SUCCESS = 'portfolio/UPDATE_PORTFOLIO_PERIOD_SUCCESS',
  UPDATE_PORTFOLIO_PERIOD_ERROR = 'portfolio/UPDATE_PORTFOLIO_PERIOD_ERROR',
  UPDATE_PORTFOLIO_CURRENCY = 'portfolio/UPDATE_PORTFOLIO_CURRENCY',
  UPDATE_PORTFOLIO_CURRENCY_SUCCESS = 'portfolio/UPDATE_PORTFOLIO_CURRENCY_SUCCESS',
  UPDATE_PORTFOLIO_CURRENCY_ERROR = 'portfolio/UPDATE_PORTFOLIO_CURRENCY_ERROR',
  UPDATE_CURRENCY = 'portfolio/UPDATE_CURRENCY',
}

export interface IPortfolioAction extends AnyAction {
  payload: any;
  type: ActionTypes.UPDATE_PORTFOLIOS
    | ActionTypes.UPDATE_PORTFOLIOS_SUCCESS
    | ActionTypes.UPDATE_PORTFOLIOS_ERROR
    | ActionTypes.TOTALS_REPLACE
    | ActionTypes.PORTFOLIO_SELECT
    | ActionTypes.PORTFOLIO_UPDATE
    | ActionTypes.PORTFOLIO_UPDATE_SUCCESS
    | ActionTypes.PORTFOLIO_UPDATE_ERROR
    | ActionTypes.PORTFOLIO_ADD
    | ActionTypes.PORTFOLIO_ADD_SUCCESS
    | ActionTypes.PORTFOLIO_ADD_ERROR
    | ActionTypes.PORTFOLIO_REMOVE
    | ActionTypes.PORTFOLIO_REMOVE_SUCCESS
    | ActionTypes.PORTFOLIO_REMOVE_ERROR
    | ActionTypes.PORTFOLIOS_ERROR
    | ActionTypes.SET_COIN_DATA
    | ActionTypes.UPDATE_PERIOD
    | ActionTypes.PORTFOLIO_COLLAPSE
    | ActionTypes.UPDATE_PORTFOLIO_CHART
    | ActionTypes.UPDATE_PORTFOLIO_CHART_SUCCESS
    | ActionTypes.UPDATE_PORTFOLIO_CHART_ERROR
    | ActionTypes.UPDATE_PORTFOLIO_PERIOD
    | ActionTypes.UPDATE_PORTFOLIO_PERIOD_SUCCESS
    | ActionTypes.UPDATE_PORTFOLIO_PERIOD_ERROR
    | ActionTypes.UPDATE_PORTFOLIO_CURRENCY
    | ActionTypes.UPDATE_PORTFOLIO_CURRENCY_SUCCESS
    | ActionTypes.UPDATE_PORTFOLIO_CURRENCY_ERROR
    | ActionTypes.UPDATE_CURRENCY
    ;
}

export const updatePortfolios = payload => ({ type: ActionTypes.UPDATE_PORTFOLIOS, payload });

export const updatePortfolioChart = payload => ({ type: ActionTypes.UPDATE_PORTFOLIO_CHART, payload });

export const updatePortfolioPeriod = payload => ({ type: ActionTypes.UPDATE_PORTFOLIO_PERIOD, payload });

export const updatePortfolioCurrency = payload => ({ type: ActionTypes.UPDATE_PORTFOLIO_CURRENCY, payload });

export const updateCollapsed = payload => ({ type: ActionTypes.PORTFOLIO_COLLAPSE, payload });

export function getTotals(data) {
  return dispatch => Promise.resolve(data)
    .then(fetchTotals)
    .then(data => dispatch({
      type: ActionTypes.TOTALS_REPLACE,
      data,
    }));
}

export const selectPortfolio = payload => ({
  type: ActionTypes.PORTFOLIO_SELECT,
  payload,
});

export const updatePortfolio = payload => ({
  type: ActionTypes.PORTFOLIO_UPDATE,
  payload,
});

export const addPortfolio = payload => ({
  type: ActionTypes.PORTFOLIO_ADD,
  payload,
});

export const removePortfolio = payload => ({
  type: ActionTypes.PORTFOLIO_REMOVE,
  payload,
});

export function setPortfoliosError(message) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: ActionTypes.PORTFOLIOS_ERROR,
      data: message,
    }));
}

export function setCoinData(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: ActionTypes.SET_COIN_DATA,
      data
    }));
}

export function updateCurrency(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: ActionTypes.UPDATE_CURRENCY,
      data
    }));
}

export function updatePeriod(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: ActionTypes.UPDATE_PERIOD,
      data
    }));
}
