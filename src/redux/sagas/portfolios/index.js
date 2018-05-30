import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../../api';
import {
  UPDATE_PORTFOLIOS,
  UPDATE_PORTFOLIOS_SUCCESS,
  UPDATE_PORTFOLIOS_ERROR,
  UPDATE_PORTFOLIO_CHART,
  UPDATE_PORTFOLIO_CHART_SUCCESS,
  UPDATE_PORTFOLIO_CHART_ERROR,
  UPDATE_PORTFOLIO_CURRENCY,
  UPDATE_PORTFOLIO_CURRENCY_ERROR,
  UPDATE_PORTFOLIO_PERIOD,
  UPDATE_PORTFOLIO_PERIOD_SUCCESS,
  UPDATE_PORTFOLIO_PERIOD_ERROR,
  TOTALS_REPLACE_SUCCESS,
  SELECT_CURRENCY_SUCCESS,
} from '../../../redux/actions/action.types';

/**
 * Fetch Markets side effect.
 * @kind SideEffect
 * @param payload { fsym, tsym, range }
 */
export function* updatePortfoliosSaga(action) {
  try {
    const response = yield call(api.portfolios.fetchPortfolios, action.payload);
    yield put({ type: UPDATE_PORTFOLIOS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: UPDATE_PORTFOLIOS_ERROR, payload: error });
  }
}

export function* updatePortfolioChartSaga(action) {
  try {
    const { period, symbol, portfolio: portfolioId } = action.payload;
    const response = yield call(api.portfolios.fetchTotals, {
      portfolioId,
      range: period,
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
    yield put({ type: UPDATE_PORTFOLIOS, payload: symbol });
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
