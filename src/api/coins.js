import { FirebaseRef } from '../lib/firebase';
import axios from 'axios';
import { getUID, fetch } from '../lib/utils';

export const addTransaction = (transaction) => {
  try {
      axios.post(`/coins`, transaction);
  } catch (e) {
      //yield put(fetchFailed(e));
      return;
  }
}

export const getCourse = async ({ fsym, tsym, date }) => {
  try {
      console.log(fsym, tsym, date);
      return await axios.get(`/price?fsym=${fsym}&tsyms=${tsym}`);
  } catch (e) {
      console.log(e);
      return;
  }
}

export const getCoinHisto = ({fsym = 'BTC', tsym = 'USD', range = '6m'}) => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject('auth problem');
  return fetch(`/histo?fsym=${fsym}&tsym=${tsym}&range=${range}`)
    .then(json => {
      // console.log('totalstotalstotalstotalstotals', json)
      return json.data || json;
    })
    .catch(console.error);
});

export const fetchCoins = (portfolioId) => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject('auth problem');

  FirebaseRef
    .child(`coins`)
    // .orderByChild('portfolioId')
    // .equalTo(portfolioId)
    .once('value')
    .then(snapshot => {
      let coins = snapshot.val() || [];
      return Object.keys(coins).map(id => coins[id]);
    })
    .then(resolve)
    .catch(reject);
});


export const setCoin = (data = {}) => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject('auth problem');

  if (!data.portfolioId) return reject('portfolioId missing');

  const coinRef = FirebaseRef.child(`coins`).push();
  const userCoinRef = FirebaseRef.child(`users/${UID}/coins`);
  const portfolioCoinRef = FirebaseRef.child(`portfolios/${data.portfolioId}/coins`);
  const id = coinRef.key;
  const key = {
    [`${id}`]: true
  };
  const owner = {
    [`${UID}`]: true
  };
  const newCoin = { owner, ...data };

  return Promise
    .all([
      coinRef.set(newCoin),
      userCoinRef.update(key),
      portfolioCoinRef.update(key),
    ])
    .then(() => resolve({ id, ...newCoin }))
    .catch(reject);
});


export const delCoin = (coinId) => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject('auth problem');

  if (!coinId) return reject('coinId missing');

  const userCoinRef = FirebaseRef.child(`users/${UID}/coins/${coinId}`);
  const coinRef = FirebaseRef.child(`coins/${coinId}`);

  coinRef
    .once('value')
    .then(snapshot => {
      const coin = snapshot.val();
      const portfolioId = coin.portfolioId;
      const portfolioCoinRef = FirebaseRef.child(`portfolios/${portfolioId}/coins/${coinId}`);
      Promise.all([
        userCoinRef.remove(),
        coinRef.remove(),
        portfolioCoinRef.remove()
      ])
      .then(() => resolve({ portfolioId, coinId }));
    })
    .catch(reject);
});
