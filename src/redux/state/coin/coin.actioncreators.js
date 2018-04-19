import { fetchCoins, setCoin, delCoin } from '../../../api/coins';
import { fetchPortfolios } from '../../../api/portfolios';
import {
  ADD_TRANSACTION,
  GET_COURSE,
  COIN_HISTO_UPDATE,
  PORTFOLIOS_UPDATE,
  PORTFOLIO_COIN_REMOVED,
  COINS_ERROR,
  GET_AVALIABLE_TRANSACTIONS
} from '../../actions/action.types';


/////////////////////////////////////////////////////////////////
/**
  * Get course for particular pair and date
  */
export function getCourse(fsym, tsym, date) {
  return {
    type: GET_COURSE,
    payload: {
      fsym,
      tsym,
      date
    }
  };
}

/**
  * Get user transactions for particular coin
  */
export function getTransactionsList(coinId) {
  return {
    type: GET_AVALIABLE_TRANSACTIONS,
    payload: {
      coinId
    }
  };
}

// /**
//   * Add Coin
//   */

export function getCoinHisto(payload) {
  return { type: COIN_HISTO_UPDATE, payload };
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
