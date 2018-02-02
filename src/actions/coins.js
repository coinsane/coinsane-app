import { fetchCoins, setCoin, delCoin } from '../api/coins';
import { fetchPortfolios } from '../api/portfolios';

/**
  * Get Coins
  */
export function getCoins(portfolioId) {
  return dispatch => Promise.resolve(portfolioId)
    .then(fetchCoins)
    .then(coins => dispatch({ type: 'COINS_REPLACE', data: coins || [] }))
    .catch(e => console.log(e));
}

/**
  * Add Coin
  */
export function addCoin(newCoin) {
  return dispatch => Promise.resolve(newCoin)
    .then(setCoin)
    // .then(fetchCoins)
    // .then(coins => dispatch({ type: 'COINS_REPLACE', data: coins || [] }))
    .then(fetchPortfolios)
    .then(portfolios => dispatch({ type: 'PORTFOLIOS_REPLACE', data: portfolios || [] }))
    .catch(e => console.log(e));
}

/**
  * Remove Coin
  */
export function removeCoin(coinId) {
  return dispatch => Promise.resolve(coinId)
    .then(delCoin)
    .then(data => dispatch({
      type: 'PORTFOLIO_COIN_REMOVED',
      data,
    }))
    .catch(e => console.log(e));
}

/**
  * Set an Error Coins Message
  */
export function setCoinsError(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({ type: 'COINS_ERROR', data }))
    .catch(e => console.log(e));
}
