import { Firebase, FirebaseRef } from '../lib/firebase';
import { getUID } from '../lib/utils';
import { fetchPortfolios, setPortfolio, setCoin } from '../lib/db';

/**
  * Get this User's Watchlist
  */
export function getWatchlist(dispatch) {
  return dispatch => new Promise(async (resolve, reject) => {
    const UID = await getUID();
    if (!UID) return false;
    FirebaseRef
      .child(`watchlist/${UID}`)
      .on('value')
      .then((snapshot) => {
        const watchlist = snapshot.val() || [];

        return resolve(dispatch({
          type: 'WATCHLIST_REPLACE',
          data: watchlist,
        }));
      }).catch(reject)
  }).catch(e => console.log(e));
}

/**
  * Reset a User's Watchlist in Redux (eg for logou)
  */
export function resetWatchlist(dispatch) {
  return dispatch({
    type: 'WATCHLIST_REPLACE',
    data: [],
  });
}

/**
  * Update My Watchlist Coins
  */
export function replaceWatchlist(newWatchlist) {
  return Promise.resolve().then(async () => {
    const UID = await getUID();
    if (!UID) return false;

    return () => FirebaseRef.child(`watchlist/${UID}`).set(newWatchlist);
  });
}

/**
  * Get Portfolios
  */
export function getPortfolios() {
  return dispatch => fetchPortfolios().then(portfolios => dispatch({
    type: 'PORTFOLIOS_REPLACE',
    data: portfolios
  }));
}

/**
  * Create Portfolio
  */
export function createPortfolio(newPortfolio) {
  return dispatch => new Promise(async (resolve, reject) => {
    return setPortfolio(newPortfolio)
      .then(fetchPortfolios)
      .then(portfolios => dispatch({
        type: 'PORTFOLIOS_REPLACE',
        data: portfolios
      }))
      .catch(e => console.log(e));
  });
}

/**
  * Add Coin
  */
export function addCoin(portfolioId, newCoin) {
  return dispatch => new Promise(async (resolve, reject) => {
    return setCoin(portfolioId, newCoin)
      .then(fetchPortfolios)
      .then(portfolios => dispatch({
        type: 'PORTFOLIOS_REPLACE',
        data: portfolios
      }))
      .catch(e => console.log(e));
  });
}

/**
  * Remove Portfolio
  */
export function removePortfolio(portfolioId) {
  return dispatch => new Promise(async (resolve, reject) => {
    const UID = await getUID();
    if (!UID) return false;

    FirebaseRef.child(`portfolios/${UID}/${portfolioId}`).remove()
      .then(fetchPortfolios)
      .then(portfolios => dispatch({
        type: 'PORTFOLIOS_REPLACE',
        data: portfolios
      }))
      .catch(e => console.log(e));
  });
}

/**
  * Remove Coin
  */
export function removeCoin(coinId) {
  return dispatch => new Promise(async (resolve, reject) => {
    const UID = await getUID();
    if (!UID) return false;

    FirebaseRef.child(`portfolios/${UID}/${coinId}`).remove()
      .then(fetchPortfolios)
      .then(portfolios => dispatch({
        type: 'PORTFOLIOS_REPLACE',
        data: portfolios
      }))
      .catch(e => console.log(e));
  });
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'PORTFOLIOS_ERROR',
    data: message,
  })));
}
