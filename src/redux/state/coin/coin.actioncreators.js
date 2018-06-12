import { delCoin } from '../../../api/coins';
import {
  GET_PRICE,
  COIN_HISTO_UPDATE,
  PORTFOLIO_COIN_REMOVED,
  COINS_ERROR,
  GET_AVAILABLE_TRANSACTIONS,
  UPDATE_COINS_PERIOD,
} from '../../actions/action.types';


export const getCoinHisto = payload => ({ type: COIN_HISTO_UPDATE, payload });

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


/**
  * Remove Coin
  */
export const removeCoin = payload => ({
  type: PORTFOLIO_COIN_REMOVED,
  payload,
});


/**
  * Set an Error Portfolios Message
  */
export function setCoinsError(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({ type: COINS_ERROR, data }))
    // .catch(e => console.log(e));
}
