import { fetchPortfolios, fetchTotals, etPortfolio, update, delPortfolio, watchUserPortfolios } from '../api/portfolios';

/**
  * Get Portfolios
  */
export function getPortfolios() {
  return dispatch => Promise.resolve()
    .then(fetchPortfolios)
    .then(portfolios => dispatch({
      type: 'PORTFOLIOS_REPLACE',
      data: portfolios || [],
    }))
    .catch(e => console.log(e));
}

/**
  * Get Totals
  */
export function getTotals(data) {
  console.log('getTotals', data)
  return dispatch => Promise.resolve(data)
    .then(fetchTotals)
    .then(result => {
      console.log('qweqweqweqwe')
      console.log(result)
      return result;
    })
    .then(data => dispatch({
      type: 'TOTALS_REPLACE',
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
      type: 'PORTFOLIO_SELECT',
      data: portfolioId,
    }))
    .catch(e => console.log(e));
}

/**
  * Update Portfolio
  */
export function updatePortfolio(data) {
  const { id, title, inTotal } = data;
  return dispatch => Promise.resolve({ id, title, inTotal })
    .then(update)
    .then(() => dispatch({
      type: 'PORTFOLIO_UPDATE',
      data: { id, title, inTotal },
    }))
    .catch(e => console.log(e));
}

/**
  * Add Portfolio
  */
export function addPortfolio(newPortfolio) {
  return dispatch => setPortfolio(newPortfolio)
    .then(portfolio => dispatch({
      type: 'PORTFOLIO_ADDED',
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
    .then(portfolioId => dispatch({
      type: 'PORTFOLIO_REMOVED',
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
      type: 'PORTFOLIOS_ERROR',
      data: message,
    }))
    .catch(e => console.log(e));
}

export function setCoinData(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: 'SET_COIN_DATA',
      data
    }))
    .catch(e => console.log(e));
}
