import Config from '../constants/config';
import { FirebaseRef } from '../lib/firebase';
import { getUID } from '../lib/utils';
import axios from 'axios';

export const fetchTotals = (data) => new Promise(async (resolve, reject) => {
  const { portfolioId, range } = data;
  const response = await axios.get(`/totals?portfolioId=${portfolioId}&range=${range}`);
  if (!(response && response.status === 200 && response.data.success)) return reject();
  resolve(response.data.response);
});

export const fetchPortfolios = () => new Promise(async (resolve, reject) => {
  const response = await axios.get('/portfolios');
  if (!(response && response.status === 200 && response.data.success)) return reject();
  resolve(response.data.response.portfolios);
});


export const setPortfolio = (data = {}, isNew) => new Promise(async (resolve, reject) => {
  if (isNew && !data.title) data.title = 'My Portfolio';
  // if (!data.inTotal) data.inTotal = false;

  const response = await axios.post('/portfolios', data);
  if (!(response && response.status === 200 && response.data.success)) return reject();
  resolve(response.data.response.portfolio);
});


export const update = (data = {}) => new Promise(async (resolve, reject) => {
  if (!data.title) return Promise.reject('title is empty');
  if (!data.inTotal) data.inTotal = false;

  const response = await axios.put('/portfolios', data);
  if (!(response && response.status === 200 && response.data.success)) return reject();
  resolve(response.data.response.portfolio);
});


export const delPortfolio = (portfolioId) => new Promise(async (resolve, reject) => {
  if (!portfolioId) return Promise.reject('portfolioId missing');

  const response = await axios.put('/portfolios', { portfolioId });
  if (!(response && response.status === 200 && response.data.success)) return reject();
  resolve(response.data.response.portfolioId);
});
