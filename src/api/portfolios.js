import axios from 'axios';

export const fetchTotals = data => new Promise(async (resolve, reject) => {
  const { portfolioId = 'all', range, symbol } = data;
  const response = await axios.get('/totals', { params: { portfolioId, range, symbol } });
  if (!(response && response.status === 200 && response.data.success)) return reject(console.error);
  return resolve(response.data.response);
});

export const fetchPortfolios = symbol => axios.get('/portfolios', { params: { symbol } });

export const getExchanges = () => axios.get('/exchanges');

export const setPortfolio = (data = {}) => new Promise(async (resolve, reject) => {
  const response = await axios.post('/portfolios', data);
  if (!(response && response.status === 200 && response.data.success)) return reject(console.error);
  return resolve(response.data.response.portfolio);
});


export const update = (data = { inTotal: false }) => new Promise(async (resolve, reject) => {
  if (!data.title) return Promise.reject('title is empty');

  const response = await axios.put('/portfolios', data);
  if (!(response && response.status === 200 && response.data.success)) return reject(console.error);
  return resolve(response.data.response.portfolio);
});


export const delPortfolio = portfolioId => new Promise(async (resolve, reject) => {
  if (!portfolioId) return Promise.reject('portfolioId missing');

  const response = await axios.delete('/portfolios', { data: { portfolioId } });
  if (!(response && response.status === 200 && response.data.success)) return reject(console.error);
  return resolve(response.data.response.portfolioId);
});
