import { FirebaseRef } from '../lib/firebase';
import { getUID } from '../lib/utils';


export const fetchPortfolios = () => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject('auth problem');

  const portfolioRef = FirebaseRef.child('portfolios');

  portfolioRef
    .once('value')
    .then(snapshot => {
      const portfolios = [];
      snapshot.forEach(snapshot => {
        const id = snapshot.key;
        const snapshotData = snapshot.val();
        if (snapshotData.owner[UID]) {
          portfolios.push({ id, ...snapshotData });
        }
      });
      if (!portfolios.length) return setPortfolio(undefined, true).then(fetchPortfolios);
      return portfolios;
    })
    .then(portfolios => {
      const portfoliosWithCoins = portfolios.map((portfolio, id) => {
        const coins = Object.keys(portfolio.coins || {});
        if (!coins.length) {
          return Promise.resolve(portfolio);
        }
        return Promise
          .all(coins.map(coin => {
            const coinRef = FirebaseRef.child(`coins/${coin}`);
            const id = coinRef.key;
            return coinRef.once('value').then(snapshot => {
              const coin = snapshot.val();
              return { id, ...coin };
            });
          }))
          .then(coins => {
            portfolio.coins = coins;
            return portfolio;
          });
      });
      return Promise.all(portfoliosWithCoins);
    })
    .then(resolve)
    .catch(reject);
});


export const setPortfolio = (data = {}, isNew) => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject('auth problem');

  if (isNew && !data.title) data.title = 'My Portfolio';
  if (!data.title) return reject('title is empty');

  const portfolioRef = FirebaseRef.child(`portfolios`).push();
  const userPortfolioRef = FirebaseRef.child(`users/${UID}/portfolios`);
  const id = portfolioRef.key;
  const key = {
    [`${id}`]: true
  };
  const owner = {
    [`${UID}`]: true
  };
  const newPortfolio = { owner, ...data };

  return Promise.resolve()
    .then(() => portfolioRef.set(newPortfolio))
    .then(() => userPortfolioRef.update(key))
    .then(() => resolve({id, ...newPortfolio}))
    .catch(reject);
});


export const delPortfolio = (portfolioId) => new Promise(async (resolve, reject) => {
  const UID = await getUID();
  if (!UID) return reject('auth problem');

  if (!portfolioId) return reject('portfolioId missing');

  const userPortfolioRef = FirebaseRef.child(`users/${UID}/portfolios/${portfolioId}`);
  const portfolioRef = FirebaseRef.child(`portfolios/${portfolioId}`);

  portfolioRef.once('value')
    .then(snapshot => {
      const portfolio = snapshot.val();
      const coinsRemove = portfolio.coins ? Object.keys(portfolio.coins).map(coinId => {
        const userCoinRef = FirebaseRef.child(`users/${UID}/coins/${coinId}`);
        const coinRef = FirebaseRef.child(`coins/${coinId}`);
        return Promise.all([
          userCoinRef.remove(),
          coinRef.remove()
        ]);
      }) : [];

      const remove = [
        userPortfolioRef.remove(),
        portfolioRef.remove(),
      ];

      if (coinsRemove.length) remove.push(...coinsRemove);

      Promise
        .all(remove)
        .then(() => resolve(portfolioId))
        .catch(reject);
    });
});
