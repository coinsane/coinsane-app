import { fetchCoins, getCoinHisto, setCoin, delCoin } from '../api/coins';
import { fetchPortfolios } from '../api/portfolios';
import { API_GET_AVALIABLE_COINS, COIN_HISTO_UPDATE, PORTFOLIOS_UPDATE, PORTFOLIO_COIN_REMOVED, COINS_ERROR } from './action.types';

/**
  * Get All Coins
  */
export function getAvaliableCoins() {
  return {
    type: API_GET_AVALIABLE_COINS
  };
}

/**
  * Add Coin
  */
export function updateCoinHisto(data) {
  return dispatch => Promise.resolve(data)
    .then(getCoinHisto)
    .then(histo => dispatch({ type: COIN_HISTO_UPDATE, data: histo }))
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
    .then(portfolios => dispatch({ type: PORTFOLIOS_UPDATE, data: portfolios || [] }))
    .catch(e => console.log(e));
}

/**
  * Remove Coin
  */
export function removeCoin(coinId) {
  return dispatch => Promise.resolve(coinId)
    .then(delCoin)
    .then(data => dispatch({
      type: PORTFOLIO_COIN_REMOVED,
      data,
    }))
    .catch(e => console.log(e));
}

/**
  * Set an Error Coins Message
  */
export function setCoinsError(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({ type: COINS_ERROR, data }))
    .catch(e => console.log(e));
}
