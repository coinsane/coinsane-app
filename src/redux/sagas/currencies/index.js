import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../../api';
import {
  GET_AVAILABLE_CURRENCIES,
  GET_AVAILABLE_CURRENCIES_SUCCESS,
  GET_AVAILABLE_CURRENCIES_ERROR,
  SELECT_CURRENCY,
  SELECT_CURRENCY_SUCCESS,
  SELECT_CURRENCY_ERROR,
  UPDATE_PORTFOLIO_CHART,
  UPDATE_CHART,
  UPDATE_CHART_SUCCESS,
  UPDATE_CHART_ERROR,
  TOTALS_REPLACE,
  UPDATE_PERIOD_SUCCESS,
} from '../../../redux/actions/action.types';

export function* fetchAvailablecurrencies(action) {
  const response = yield call(api.currencies.fetchAvailableCurrencies, action.payload.limit || 10);
  yield put({ type: GET_AVAILABLE_CURRENCIES_SUCCESS, payload: response.data.response.result });
}

export function* selectCurrency(action) {
  try {
    yield put({ type: SELECT_CURRENCY_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: SELECT_CURRENCY_ERROR, error });
  }
}

// updatePortfolioChart(portfolioId, range, symbol) {
//   this.props.getTotals({ portfolioId, range, symbol });
//   this.props.updatePeriod(range);
//   this.props.portfoliosFetch(symbol);
// }

// for rootSaga
export default [
  takeLatest(GET_AVAILABLE_CURRENCIES, fetchAvailablecurrencies),
  takeLatest(SELECT_CURRENCY, selectCurrency),
];


/*
export function getTotals(data) {
  return dispatch => Promise.resolve(data)
    .then(fetchTotals)
    .then(data => dispatch({
      type: TOTALS_REPLACE,
      data,
    }))
    .catch(e => console.log(e));
}
 */
