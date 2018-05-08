import React from 'react';
import { fetchPortfolios, fetchTotals, setPortfolio, update, delPortfolio, watchUserPortfolios } from '../../../api/portfolios';
import {
  UPDATE_PORTFOLIOS,
  TOTALS_REPLACE,
  PORTFOLIO_SELECT,
  PORTFOLIO_UPDATE,
  PORTFOLIO_ADDED,
  PORTFOLIO_REMOVED,
  PORTFOLIOS_ERROR,
  SET_COIN_DATA,
  UPDATE_PERIOD,
  UPDATE_COLLAPSED,
  UPDATE_PORTFOLIO_CHART,
  UPDATE_PORTFOLIO_PERIOD,
  UPDATE_PORTFOLIO_CURRENCY,
} from '../../actions/action.types';

export const updatePortfolios = payload => ({ type: UPDATE_PORTFOLIOS, payload });
export const updatePortfolioChart = payload => ({ type: UPDATE_PORTFOLIO_CHART, payload });
export const updatePortfolioPeriod = payload => ({ type: UPDATE_PORTFOLIO_PERIOD, payload });
export const updatePortfolioCurrency = payload => ({ type: UPDATE_PORTFOLIO_CURRENCY, payload });

/**
  * Get Totals
  */
export function getTotals(data) {
  return dispatch => Promise.resolve(data)
    .then(fetchTotals)
    .then(data => dispatch({
      type: TOTALS_REPLACE,
      data,
    }))
    .catch(e => console.log(e));
}

/**
  * Select Portfolio
  */
export function selectPortfolio(portfolioId) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: PORTFOLIO_SELECT,
      data: portfolioId,
    }))
    .catch(e => console.log(e));
}

/**
  * Update Portfolio
  */
export function updatePortfolio(data) {
  const { _id, title, inTotal } = data;
  return dispatch => Promise.resolve({ _id, title, inTotal })
    .then(update)
    .then(() => dispatch({
      type: PORTFOLIO_UPDATE,
      data: { _id, title, inTotal },
    }))
    .catch(e => console.log(e));
}

/**
  * Add Portfolio
  */
export function addPortfolio(newPortfolio) {
  return dispatch => setPortfolio(newPortfolio)
    .then(portfolio => dispatch({
      type: PORTFOLIO_ADDED,
      data: portfolio,
    }))
    .catch(e => console.log(e));
}

/**
  * Remove Portfolio
  */
export function removePortfolio(portfolioId) {
  return dispatch => Promise.resolve(portfolioId)
    .then(delPortfolio)
    .then(() => dispatch({
      type: PORTFOLIO_REMOVED,
      data: portfolioId,
    }))
    .catch(e => console.log(e));
}

/**
  * Set an Error Portfolios Message
  */
export function setPortfoliosError(message) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: PORTFOLIOS_ERROR,
      data: message,
    }))
    .catch(e => console.log(e));
}

export function setCoinData(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: SET_COIN_DATA,
      data
    }))
    .catch(e => console.log(e));
}

export function updateCurrency(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: 'UPDATE_CURRENCY',
      data
    }))
    .catch(e => console.log(e));
}

export function updatePeriod(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: UPDATE_PERIOD,
      data
    }))
    .catch(e => console.log(e));
}

export function updateCollapsed(portfolioId) {
  return {
    type: UPDATE_COLLAPSED,
    portfolioId,
  };
}
