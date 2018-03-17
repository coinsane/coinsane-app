import Config from '../constants/config';
import axios from 'axios';

export const fetchTotals = (data) => new Promise(async (resolve, reject) => {
  const { portfolioId, range, symbol } = data;
  const response = await axios.get('/totals', { params: { portfolioId, range, symbol} });
  if (!(response && response.status === 200 && response.data.success)) return reject(console.error);
  resolve(response.data.response);
});

export const fetchPortfolios = (symbol) => new Promise(async (resolve, reject) => {
  const response = await axios.get('/portfolios', { params: { symbol } });
  if (!(response && response.status === 200 && response.data.success)) return reject(console.error);
  console.log('response.data.response.portfolios', response.data.response.portfolios)
  resolve(response.data.response.portfolios);
});


export const setPortfolio = (data = {}) => new Promise(async (resolve, reject) => {
  const response = await axios.post('/portfolios', data);
  if (!(response && response.status === 200 && response.data.success)) return reject(console.error);
  resolve(response.data.response.portfolio);
});


export const update = (data = {}) => new Promise(async (resolve, reject) => {
  if (!data.title) return Promise.reject('title is empty');
  if (!data.inTotal) data.inTotal = false;

  const response = await axios.put('/portfolios', data);
  if (!(response && response.status === 200 && response.data.success)) return reject(console.error);
  resolve(response.data.response.portfolio);
});


export const delPortfolio = (portfolioId) => new Promise(async (resolve, reject) => {
  if (!portfolioId) return Promise.reject('portfolioId missing');

  const response = await axios.delete('/portfolios', { data: { portfolioId }});
  if (!(response && response.status === 200 && response.data.success)) return reject(console.error);
  resolve(response.data.response.portfolioId);
});
