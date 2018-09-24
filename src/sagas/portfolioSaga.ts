import { Actions } from 'react-native-router-flux';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  coin as coinActions,
  currency as currencyActions,
  market as marketActions,
  portfolio as portfolioActions,
} from 'src/actions';
import api from 'src/api';

import selectors from './selectors';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action { payload }
 */
export function* updatePortfoliosSaga (action) {
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
      type: marketActions.ActionTypes.UPDATE_MARKETS_CACHE,
      payload: marketsItems,
    });
    yield put({
      type: coinActions.ActionTypes.UPDATE_COINS_CACHE,
      payload: coinsItems,
    });
    yield put({
      type: portfolioActions.ActionTypes.UPDATE_PORTFOLIOS_SUCCESS,
      payload: portfoliosItems,
    });
  } catch (error) {
    yield put({ type: portfolioActions.ActionTypes.UPDATE_PORTFOLIOS_ERROR, payload: error });
  }
}

export function* updatePortfolioChartSaga (action) {
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
      type: portfolioActions.ActionTypes.UPDATE_PORTFOLIO_CHART_SUCCESS,
      payload: {
        portfolioId,
        range,
        symbol,
        totals,
      },
    });
  } catch (error) {
    yield put({ type: portfolioActions.ActionTypes.UPDATE_PORTFOLIO_CHART_ERROR, error });
  }
}

export function* updatePortfolioCurrencySaga (action) {
  try {
    const { period, portfolio } = action.payload;
    const portfolioId = portfolio || 'all';
    const range = period || '1d';
    let { symbol } = action.payload;
    if (!symbol) {
      symbol = yield select(selectors.getSymbol);
    }
    yield put({ type: currencyActions.ActionTypes.SELECT_CURRENCY_SUCCESS, payload: symbol });
    const { totals } = yield call(api.portfolios.fetchTotals, {
      portfolioId,
      range,
      symbol,
    });
    yield put({
      type: portfolioActions.ActionTypes.UPDATE_PORTFOLIO_CHART_SUCCESS,
      payload: {
        portfolioId,
        range,
        symbol,
        totals,
      },
    });
    // yield put({ type: UPDATE_PORTFOLIOS, payload: { symbol } });
  } catch (error) {
    yield put({ type: portfolioActions.ActionTypes.UPDATE_PORTFOLIO_CURRENCY_ERROR, error });
  }
}

export function* updatePortfolioPeriodSaga (action) {
  try {
    const { period, portfolio } = action.payload;
    const portfolioId = portfolio || 'all';
    const range = period || '1d';
    yield put({
      payload: range,
      type: portfolioActions.ActionTypes.UPDATE_PORTFOLIO_PERIOD_SUCCESS,
    });
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
      payload: {
        portfolioId,
        range,
        symbol,
        totals,
      },
      type: portfolioActions.ActionTypes.UPDATE_PORTFOLIO_CHART_SUCCESS,
    });
  } catch (error) {
    yield put({ type: portfolioActions.ActionTypes.UPDATE_PORTFOLIO_PERIOD_ERROR, error });
  }
}

export function* editPortfolioSaga (action) {
  try {
    const response = yield call(api.portfolios.update, action.payload);
    yield put({ type: portfolioActions.ActionTypes.PORTFOLIO_UPDATE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: portfolioActions.ActionTypes.PORTFOLIO_UPDATE_ERROR, error });
  }
}

export function* removePortfolioSaga (action) {
  try {
    const response = yield call(api.portfolios.delPortfolio, action.payload);
    yield put({ type: portfolioActions.ActionTypes.PORTFOLIO_REMOVE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: portfolioActions.ActionTypes.PORTFOLIO_REMOVE_ERROR, error });
  }
}

export function* addPortfolioSaga (action) {
  try {
    const { _id, title, inTotal } = yield call(api.portfolios.setPortfolio, action.payload);
    yield put({
      type: portfolioActions.ActionTypes.PORTFOLIO_ADD_SUCCESS,
      payload: {
        _id,
        title,
        inTotal,
        data: [],
        amount: 0,
      },
    });
    yield put({ type: portfolioActions.ActionTypes.UPDATE_PORTFOLIOS, payload: {} });
    Actions.pop();
  } catch (error) {
    yield put({ type: portfolioActions.ActionTypes.PORTFOLIO_ADD_ERROR, payload: error });
  }
}

export function* coinRemovedSaga (action) {
  try {
    const { id, portfolioId } = action.payload;
    const response = yield call(api.coins.removeCoin, { coinId: id });
  } catch (error) {}
}

// for rootSaga
export default [
  takeLatest(portfolioActions.ActionTypes.UPDATE_PORTFOLIOS, updatePortfoliosSaga),
  takeLatest(portfolioActions.ActionTypes.PORTFOLIO_ADD, addPortfolioSaga),
  takeLatest(portfolioActions.ActionTypes.PORTFOLIO_UPDATE, editPortfolioSaga),
  takeLatest(portfolioActions.ActionTypes.PORTFOLIO_REMOVE, removePortfolioSaga),
  takeLatest(portfolioActions.ActionTypes.UPDATE_PORTFOLIO_CHART, updatePortfolioChartSaga),
  takeLatest(portfolioActions.ActionTypes.UPDATE_PORTFOLIO_CURRENCY, updatePortfolioCurrencySaga),
  takeLatest(portfolioActions.ActionTypes.UPDATE_PORTFOLIO_PERIOD, updatePortfolioPeriodSaga),
  takeLatest(coinActions.ActionTypes.PORTFOLIO_COIN_REMOVED, coinRemovedSaga),
];
