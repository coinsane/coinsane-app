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
  PORTFOLIO_COLLAPSE,
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
  currency: 'USD',
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
        portfolioId,
        range,
        symbol,
        totals,
      } = action.payload;
      console.log('portfolioId', portfolioId);
      const chart = { ...state.chart };
      if (!chart[portfolioId]) chart[portfolioId] = {};
      let first = 0;
      const dataArr = Object.keys(totals).map((key) => {
        const value = totals[key].avg || totals[key];
        if (!first && value !== 0) first = value;
        return value;
      });
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
      const { id, portfolioId } = action.payload;
      const items = { ...state.items };
      if (items[portfolioId]) {
        const data = [];
        items[portfolioId].data.forEach((coin) => {
          if (coin._id !== id) data.push(coin);
        });
        items[portfolioId].data = data;
      }
      return {
        ...state,
        error: null,
        loading: false,
        items,
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
    case PORTFOLIO_COLLAPSE: {
      const collapsed = [...state.collapsed];
      if (collapsed.indexOf(action.payload) === -1) collapsed.push(action.payload);
      else collapsed.splice(collapsed.indexOf(action.payload), 1);
      return {
        ...state,
        collapsed,
      };
    }
    default:
      return state;
  }
}
