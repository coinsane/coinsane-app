import _ from 'lodash';
import {
  UPDATE_PORTFOLIOS,
  UPDATE_PORTFOLIOS_SUCCESS,
  UPDATE_PORTFOLIOS_ERROR,
  PORTFOLIO_SELECT,
  PORTFOLIO_ADD_SUCCESS,
  PORTFOLIO_REMOVE_SUCCESS,
  PORTFOLIO_UPDATE_SUCCESS,
  PORTFOLIO_COIN_REMOVED,
  PORTFOLIOS_ERROR,
  SET_COIN_DATA,
  UPDATE_PERIOD,
  UPDATE_PORTFOLIO_CURRENCY_SUCCESS,
  UPDATE_PORTFOLIO_PERIOD_SUCCESS,
  UPDATE_PERIOD_SUCCESS,
  UPDATE_COLLAPSED,
  UPDATE_PORTFOLIO_CHART_SUCCESS,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  refreshing: false,
  list: [],
  items: {},
  selected: null,
  chart: {},
  currency: 'BTC',
  period: '1d',
  changePct: 0,
  lastTotal: 0,
  collapsed: [],
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PORTFOLIOS: {
      return {
        ...state,
        error: null,
        loading: true,
        refreshing: action.payload.refreshing,
      };
    }
    case UPDATE_PORTFOLIOS_SUCCESS: {
      const items = { ...state.items, ...action.payload };
      return {
        ...state,
        error: null,
        loading: false,
        items,
        list: Object.keys(items),
        refreshing: false,
      };
    }
    case UPDATE_PORTFOLIOS_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        list: [],
        refreshing: false,
      };
    }
    case PORTFOLIO_SELECT: {
      return {
        ...state,
        selected: action.payload || null,
      };
    }
    case PORTFOLIO_ADD_SUCCESS: {
      const selected = action.payload._id;
      const items = { ...state.items };
      items[action.payload._id] = action.payload;
      const { list } = state;
      list.push(action.payload._id);
      return {
        ...state,
        error: null,
        loading: false,
        items,
        list,
        selected,
      };
    }
    case PORTFOLIO_REMOVE_SUCCESS: {
      const items = { ...state.items };
      delete items[action.payload];
      const list = state.list.filter(item => item !== action.payload);
      return {
        ...state,
        error: null,
        loading: false,
        selected: null,
        items,
        list,
      };
    }
    case PORTFOLIO_UPDATE_SUCCESS: {
      const { _id, title, inTotal } = action.payload;
      const items = { ...state.items };
      items[_id] = {
        ...items[_id],
        title,
        inTotal,
      };
      return {
        ...state,
        error: null,
        loading: false,
        items,
      };
    }
    case UPDATE_PORTFOLIO_CHART_SUCCESS: {
      const {
        portfolioId = 'all',
        range = '1d',
        symbol,
        totals,
      } = action.payload;
      const chart = { ...state.chart };
      if (!chart[portfolioId]) chart[portfolioId] = {};
      const dataArr = Object.keys(totals).map(key => totals[key].avg || totals[key]);
      const first = dataArr[0];
      const last = dataArr[dataArr.length - 1];
      const subtract = _.subtract(first, last);
      const divide = _.divide(subtract, first);
      const pct = _.multiply(divide, -100);
      chart[portfolioId][`${range}:${symbol}`] = {
        data: totals,
        high: _.max(dataArr),
        low: _.min(dataArr),
        pct,
      };

      return {
        ...state,
        error: null,
        loading: false,
        chart,
      };
    }
    case PORTFOLIO_COIN_REMOVED: {
      const { coinId, portfolioId } = action.data;
      return {
        ...state,
        error: null,
        loading: false,
        list: [...state.list.map(portfolio => {
          if (portfolio._id === portfolioId) {
            portfolio.coins = portfolio.coins.filter(coin => coin._id !== coinId);
          }
          return portfolio;
        })]
      };
    }
    case PORTFOLIOS_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case SET_COIN_DATA: {
      return {
        ...state,
        coinData: action.data,
      };
    }
    case 'UPDATE_CURRENCY': {
      return {
        ...state,
        currency: action.data,
      };
    }
    case UPDATE_PORTFOLIO_CURRENCY_SUCCESS: {
      return {
        ...state,
        currency: action.payload,
      };
    }
    case UPDATE_PERIOD: {
      return {
        ...state,
        period: action.data,
      };
    }
    case UPDATE_PORTFOLIO_PERIOD_SUCCESS: {
      return {
        ...state,
        period: action.payload,
      };
    }
    case UPDATE_COLLAPSED: {
      const collapsed = [...state.collapsed];
      if (collapsed.indexOf(action.portfolioId) === -1) collapsed.push(action.portfolioId);
      else collapsed.splice(collapsed.indexOf(action.portfolioId), 1);
      return {
        ...state,
        collapsed,
      };
    }
    default:
      return state;
  }
}
