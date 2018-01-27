import { Firebase, FirebaseRef } from './firebase';
import { getUID } from './utils';

export const fetchPortfolios = () => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject({ message: 'auth problem' });
  FirebaseRef
    .child(`portfolios/${UID}`)
    .once('value')
    .then(parsePortfolios)
    .then(resolve)
    .catch(reject)
});

export const setPortfolio = ({ title }) => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject({ message: 'auth problem' });
  if (!title) return reject({ message: 'title is empty' });

  const portfolioRef = FirebaseRef.child(`portfolios/${UID}`).push();
  const _id = portfolioRef.key;
  const newPortfolio = {
    _id,
    title: `${title} #${_id}`,
    data: []
  };
  return portfolioRef.set(newPortfolio).then(() => resolve(_id)).catch(e => console.log(e));
});

export const setCoin = (portfolioId, { title }) => new Promise(async (resolve, reject) => {
  console.log('setCoin')
  const UID = await getUID();
  if (!UID) return reject({ message: 'auth problem' });
  if (!portfolioId) return reject({ message: 'portfolioId missing' });
  if (!title) return reject({ message: 'title is empty' });

  const coinRef = FirebaseRef.child(`portfolios/${UID}/${portfolioId}/data`).push();
  const _id = coinRef.key;
  const newCoin = {
    _id,
    "id": "ethereum",
    "name": "Ethereum",
    "symbol": "ETH",
    "rank": "2",
    "price_usd": "1035.63",
    "price_btc": "0.0924917",
    "24h_volume_usd": "3792450000.0",
    "market_cap_usd": "100648655494",
    "available_supply": "97185921.0",
    "total_supply": "97185921.0",
    "max_supply": null,
    "percent_change_1h": "0.04",
    "percent_change_24h": "3.27",
    "percent_change_7d": "12.24",
    "last_updated": "1516822153"
  };
  return coinRef.set(newCoin).then(() => resolve(_id)).catch(e => console.log(e));
});


function parsePortfolios(snapshot) {
  const portfolios = snapshot.val() || {};
  return Promise.resolve().then(() => Object.keys(portfolios).map(portfolioId => {
    const portfolio = portfolios[portfolioId];
    const data = portfolio.data ? Object.keys(portfolio.data).map(coinId => portfolio.data[coinId]) : [];
    portfolio.data = data;
    return portfolio;
  }));
}
