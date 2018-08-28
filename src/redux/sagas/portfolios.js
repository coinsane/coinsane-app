import { takeLatest, put, call, select } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import api from '../../api';
import selectors from '../selectors';
import {
  UPDATE_PORTFOLIOS,
  PORTFOLIO_UPDATE,
  PORTFOLIO_UPDATE_SUCCESS,
  PORTFOLIO_UPDATE_ERROR,
  UPDATE_PORTFOLIOS_SUCCESS,
  UPDATE_PORTFOLIOS_ERROR,
  UPDATE_PORTFOLIO_CHART,
  UPDATE_PORTFOLIO_CHART_ERROR,
  UPDATE_PORTFOLIO_CURRENCY,
  UPDATE_PORTFOLIO_CURRENCY_ERROR,
  UPDATE_PORTFOLIO_PERIOD,
  UPDATE_PORTFOLIO_PERIOD_SUCCESS,
  UPDATE_PORTFOLIO_PERIOD_ERROR,
  UPDATE_PORTFOLIO_CHART_SUCCESS,
  SELECT_CURRENCY_SUCCESS,
  UPDATE_MARKETS_CACHE,
  UPDATE_COINS_CACHE,
  PORTFOLIO_REMOVE,
  PORTFOLIO_REMOVE_SUCCESS,
  PORTFOLIO_REMOVE_ERROR,
  PORTFOLIO_ADD,
  PORTFOLIO_ADD_SUCCESS,
  PORTFOLIO_ADD_ERROR,
  PORTFOLIO_COIN_REMOVED,
} from '../../redux/actions/action.types';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action { payload }
 */
export function* updatePortfoliosSaga(action) {
  try {
    let { symbol } = action.payload;
    if (!symbol) symbol = yield select(selectors.getSymbol);
    const marketsItems = {};
    const coinsItems = {};
    const portfoliosItems = {};

    const { data: { response: { portfolios } } } = yield call(api.portfolios.fetchPortfolios, symbol);
    portfolios.forEach((portfolio) => {
      const { coins, ...rest } = portfolio;
      portfoliosItems[portfolio._id] = {
        ...rest,
        data: coins.map((item) => {
          const { _id, amount, market, amounts, transactions } = item;
          coinsItems[_id] = {
            _id,
            amount,
            amounts,
            market: market._id,
            portfolio: portfolio._id,
            transactions,
          };
          if (!marketsItems[market._id]) marketsItems[market._id] = market;
          return { _id, amount, market: market._id };
        }),
      };
    });
    yield put({
      type: UPDATE_MARKETS_CACHE,
      payload: marketsItems,
    });
    yield put({
      type: UPDATE_COINS_CACHE,
      payload: coinsItems,
    });
    yield put({
      type: UPDATE_PORTFOLIOS_SUCCESS,
      payload: portfoliosItems,
    });
  } catch (error) {
    yield put({ type: UPDATE_PORTFOLIOS_ERROR, payload: error });
  }
}

export function* updatePortfolioChartSaga(action) {
  try {
    const { period, portfolio } = action.payload;
    const portfolioId = portfolio || 'all';
    const range = period || '1d';
    let { symbol } = action.payload;
    if (!symbol) symbol = yield select(selectors.getSymbol);
    const { totals } = yield call(api.portfolios.fetchTotals, {
      portfolioId,
      range,
      symbol,
    });
    yield put({
      type: UPDATE_PORTFOLIO_CHART_SUCCESS,
      payload: {
        portfolioId,
        range,
        symbol,
        totals,
      },
    });
  } catch (error) {
    yield put({ type: UPDATE_PORTFOLIO_CHART_ERROR, error });
  }
}

export function* updatePortfolioCurrencySaga(action) {
  try {
    const { period, portfolio } = action.payload;
    const portfolioId = portfolio || 'all';
    const range = period || '1d';
    let { symbol } = action.payload;
    if (!symbol) {
      symbol = yield select(selectors.getSymbol);
    }
    yield put({ type: SELECT_CURRENCY_SUCCESS, payload: symbol });
    const { totals } = yield call(api.portfolios.fetchTotals, {
      portfolioId,
      range,
      symbol,
    });
    yield put({
      type: UPDATE_PORTFOLIO_CHART_SUCCESS,
      payload: {
        portfolioId,
        range,
        symbol,
        totals,
      },
    });
    // yield put({ type: UPDATE_PORTFOLIOS, payload: { symbol } });
  } catch (error) {
    yield put({ type: UPDATE_PORTFOLIO_CURRENCY_ERROR, error });
  }
}

export function* updatePortfolioPeriodSaga(action) {
  try {
    const { period, portfolio } = action.payload;
    const portfolioId = portfolio || 'all';
    const range = period || '1d';
    yield put({ type: UPDATE_PORTFOLIO_PERIOD_SUCCESS, payload: range });
    let { symbol } = action.payload;
    if (!symbol) {
      symbol = yield select(selectors.getSymbol);
    }
    const response = yield call(api.portfolios.fetchTotals, {
      portfolioId,
      symbol,
      range,
    });
    const { totals } = response;
    yield put({
      type: UPDATE_PORTFOLIO_CHART_SUCCESS,
      payload: {
        portfolioId,
        range,
        symbol,
        totals,
      },
    });
  } catch (error) {
    yield put({ type: UPDATE_PORTFOLIO_PERIOD_ERROR, error });
  }
}

export function* editPortfolioSaga(action) {
  try {
    const response = yield call(api.portfolios.update, action.payload);
    yield put({ type: PORTFOLIO_UPDATE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: PORTFOLIO_UPDATE_ERROR, error });
  }
}

export function* removePortfolioSaga(action) {
  try {
    const response = yield call(api.portfolios.delPortfolio, action.payload);
    yield put({ type: PORTFOLIO_REMOVE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: PORTFOLIO_REMOVE_ERROR, error });
  }
}

export function* addPortfolioSaga(action) {
  try {
    const { _id, title, inTotal } = yield call(api.portfolios.setPortfolio, action.payload);
    yield put({
      type: PORTFOLIO_ADD_SUCCESS,
      payload: {
        _id,
        title,
        inTotal,
        data: [],
        amount: 0,
      },
    });
    yield put({ type: UPDATE_PORTFOLIOS, payload: {} });
    Actions.pop();
  } catch (error) {
    yield put({ type: PORTFOLIO_ADD_ERROR, payload: error });
  }
}

export function* coinRemovedSaga(action) {
  try {
    const { id, portfolioId } = action.payload;
    const response = yield call(api.coins.removeCoin, { coinId: id });
  } catch (error) {}
}

// for rootSaga
export default [
  takeLatest(UPDATE_PORTFOLIOS, updatePortfoliosSaga),
  takeLatest(PORTFOLIO_ADD, addPortfolioSaga),
  takeLatest(PORTFOLIO_UPDATE, editPortfolioSaga),
  takeLatest(PORTFOLIO_REMOVE, removePortfolioSaga),
  takeLatest(UPDATE_PORTFOLIO_CHART, updatePortfolioChartSaga),
  takeLatest(UPDATE_PORTFOLIO_CURRENCY, updatePortfolioCurrencySaga),
  takeLatest(UPDATE_PORTFOLIO_PERIOD, updatePortfolioPeriodSaga),
  takeLatest(PORTFOLIO_COIN_REMOVED, coinRemovedSaga),
];
