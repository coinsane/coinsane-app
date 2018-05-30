import { takeLatest, put, call, select } from 'redux-saga/effects';
import api from '../../../api';
import selectors from '../../selectors';
import {
  UPDATE_PORTFOLIOS,
  UPDATE_PORTFOLIOS_SUCCESS,
  UPDATE_PORTFOLIOS_ERROR,
  UPDATE_PORTFOLIO_CHART,
  UPDATE_PORTFOLIO_CHART_ERROR,
  UPDATE_PORTFOLIO_CURRENCY,
  UPDATE_PORTFOLIO_CURRENCY_ERROR,
  UPDATE_PORTFOLIO_PERIOD,
  UPDATE_PORTFOLIO_PERIOD_SUCCESS,
  UPDATE_PORTFOLIO_PERIOD_ERROR,
  TOTALS_REPLACE_SUCCESS,
  SELECT_CURRENCY_SUCCESS,
  UPDATE_MARKETS_CACHE,
} from '../../../redux/actions/action.types';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param action { payload }
 */
export function* updatePortfoliosSaga(action) {
  try {
    let { symbol } = action.payload;
    if (!symbol) {
      symbol = yield select(selectors.getSymbol);
    }
    const response = yield call(api.portfolios.fetchPortfolios, symbol);
    const { portfolios } = response.data.response;
    const items = {};
    const sections = portfolios.map((section) => {
      const { coins, ...rest } = section;
      return {
        ...rest,
        data: coins.map((item) => {
          const { _id, amount, market } = item;
          if (!items[market._id]) items[market._id] = market;
          return { _id, amount, market: market._id };
        }),
      };
    });
    yield put({
      type: UPDATE_MARKETS_CACHE,
      payload: items,
    });
    yield put({
      type: UPDATE_PORTFOLIOS_SUCCESS,
      payload: sections,
    });
  } catch (error) {
    yield put({ type: UPDATE_PORTFOLIOS_ERROR, payload: error });
  }
}

export function* updatePortfolioChartSaga(action) {
  try {
    const { period: range, symbol, portfolio: portfolioId } = action.payload;
    const response = yield call(api.portfolios.fetchTotals, {
      portfolioId,
      range,
      symbol,
    });
    const { totals, lastTotal, changePct } = response;
    yield put({
      type: TOTALS_REPLACE_SUCCESS,
      payload: {
        portfolioId,
        totals,
        lastTotal,
        changePct,
      },
    });
  } catch (error) {
    yield put({ type: UPDATE_PORTFOLIO_CHART_ERROR, error });
  }
}

export function* updatePortfolioCurrencySaga(action) {
  try {
    const { period, symbol, portfolio: portfolioId } = action.payload;
    const { totals, lastTotal, changePct } = yield call(api.portfolios.fetchTotals, {
      portfolioId,
      range: period,
      symbol,
    });
    yield put({
      type: TOTALS_REPLACE_SUCCESS,
      payload: {
        portfolioId,
        totals,
        lastTotal,
        changePct,
      },
    });
    yield put({ type: UPDATE_PORTFOLIOS, payload: { symbol } });
    yield put({ type: SELECT_CURRENCY_SUCCESS, payload: symbol });
  } catch (error) {
    yield put({ type: UPDATE_PORTFOLIO_CURRENCY_ERROR, error });
  }
}

export function* updatePortfolioPeriodSaga(action) {
  try {
    const { period, symbol, portfolio: portfolioId } = action.payload;
    const response = yield call(api.portfolios.fetchTotals, {
      portfolioId,
      symbol,
      range: period,
    });
    const { totals, lastTotal, changePct } = response;
    yield put({
      type: TOTALS_REPLACE_SUCCESS,
      payload: {
        portfolioId,
        totals,
        lastTotal,
        changePct,
      },
    });
    yield put({ type: UPDATE_PORTFOLIO_PERIOD_SUCCESS, payload: period });
  } catch (error) {
    yield put({ type: UPDATE_PORTFOLIO_PERIOD_ERROR, error });
  }
}

// for rootSaga
export default [
  takeLatest(UPDATE_PORTFOLIOS, updatePortfoliosSaga),
  takeLatest(UPDATE_PORTFOLIO_CHART, updatePortfolioChartSaga),
  takeLatest(UPDATE_PORTFOLIO_CURRENCY, updatePortfolioCurrencySaga),
  takeLatest(UPDATE_PORTFOLIO_PERIOD, updatePortfolioPeriodSaga),
];
