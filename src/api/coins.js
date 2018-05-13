import axios from 'axios';

export const addTransaction = async (transaction) => {
  try {
    return await axios.post('/coins', transaction);
  } catch (e) {
    return null;
  }
};

export const getCourse = async ({ fsym, tsyms, date }) => {
  try {
    const course = await axios.get('/price', { params: { fsym, tsyms } });
    return course;
  } catch (e) {
    return;
  }
};

export const getTransactionsList = async ({ coinId }) => {
  try {
    return await axios.get(`/transactions?coinId=${coinId}`);
  } catch (e) {
    return;
  }
};

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
