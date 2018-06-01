import { delCoin } from '../../../api/coins';
import {
  ADD_TRANSACTION,
  GET_PRICE,
  COIN_HISTO_UPDATE,
  PORTFOLIO_COIN_REMOVED,
  COINS_ERROR,
  GET_AVAILABLE_TRANSACTIONS,
  COIN_MARKETS_UPDATE,
  UPDATE_COINS_PERIOD,
} from '../../actions/action.types';

/**
  * Get course for particular pair and date
  */
export function getPrice({ fsym, tsyms, date }) {
  return {
    type: GET_PRICE,
    payload: {
      fsym,
      tsyms,
      date,
    },
  };
}

/**
  * Get markets for particular coin
  */
export function getCoinMarkets({ fsym, tsym }) {
  return {
    type: COIN_MARKETS_UPDATE,
    payload: {
      fsym,
      tsym,
    },
  };
}
/**
  * Update period for coins chart
  */
export const updateCoinsPeriod = payload => ({
  type: UPDATE_COINS_PERIOD,
  payload,
});

/**
  * Get user transactions for particular coin
  */
export function getTransactionsList(coinId) {
  return {
    type: GET_AVAILABLE_TRANSACTIONS,
    payload: {
      coinId,
    },
  };
}

/**
  * Add Coin
  */

export function getCoinHisto(payload) {
  return { type: COIN_HISTO_UPDATE, payload };
}

/**
  * Add Transaction
  */
export function addTransaction(transaction) {
  return {
    type: ADD_TRANSACTION,
    payload: transaction,
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
    // .catch(e => console.log(e));
}

/**
  * Set an Error Portfolios Message
  */
export function setCoinsError(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({ type: COINS_ERROR, data }))
    // .catch(e => console.log(e));
}
