import axios from 'axios';

export const getTransactions = ({ coinId }) => axios.get('/transactions', { params: { coinId } });

export const addTransaction = async (transaction) => {
  try {
    return await axios.post('/coins', transaction);
  } catch (e) {
    return null;
  }
};

export const getPrice = ({ fsym, tsyms }) => axios.get('/price', { params: { fsym, tsyms } });

export const getCoinHisto = async ({ fsym, tsym, range }) => {
  try {
    return await axios.get('/histo', { params: { fsym, tsym, range } });
  } catch (e) {
    // yield put(fetchFailed(e));
    return null;
  }
};
export const getCoinMarkets = async ({ fsym, tsym }) => {
  try {
    return await axios.get('/market/list', { params: { fsym, tsym } });
  } catch (e) {
    // yield put(fetchFailed(e));
    return;
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
