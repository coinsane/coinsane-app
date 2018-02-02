import { fetchPortfolios, setPortfolio, delPortfolio, watchUserPortfolios } from '../api/portfolios';

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
