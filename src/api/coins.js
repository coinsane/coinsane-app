import axios from 'axios';

export const getTransactions = ({ coinId }) => axios.get('/transactions', { params: { coinId } });

export const addTransaction = transaction => axios.post('/coins', transaction);

export const getPrice = ({ fsym, tsyms, date }) => axios.get('/price', { params: { fsym, tsyms, date } });

export const getCoinHisto = ({ fsym, tsym, range }) => axios.get('/histo', { params: { fsym, tsym, range } });

export const getExchanges = async (params) => {
  try {
    const { data } = await axios.get('/market/exchanges', { params });
    return data;
  } catch (e) {
    return null;
  }
};


export const fetchCoins = portfolioId => new Promise(async (resolve) => {
  resolve(portfolioId);
});


export const setCoin = (data = {}) => new Promise(async (resolve) => {
  resolve(data);
});


export const delCoin = coinId => new Promise(async (resolve) => {
  resolve(coinId);
});
