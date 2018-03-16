import { fetchCoins, getCoinHisto, setCoin, delCoin } from '../api/coins';
import { fetchPortfolios } from '../api/portfolios';
import { 
  ADD_TRANSACTION, 
  GET_COURSE,
  COIN_HISTO_UPDATE, 
  PORTFOLIOS_UPDATE, 
  PORTFOLIO_COIN_REMOVED, 
  COINS_ERROR 
} from './action.types';


/////////////////////////////////////////////////////////////////
/**
  * Get course for particular pair and date
  */
export function getCourse(from, to, date) {
  return {
    type: GET_COURSE,
    payload: {
      from,
      to,
      date
    }
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
  * Add Transaction
  */
export function addTransaction(transaction) {
  return {
    type: ADD_TRANSACTION,
    payload: transaction
  };
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

