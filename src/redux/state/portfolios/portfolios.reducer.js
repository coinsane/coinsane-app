import { PORTFOLIOS_UPDATE, PORTFOLIO_ADDED, PORTFOLIO_SELECT, PORTFOLIO_REMOVED, PORTFOLIO_UPDATE, TOTALS_REPLACE, PORTFOLIO_COIN_REMOVED, PORTFOLIOS_ERROR, SET_COIN_DATA } from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: [],
  selected: null,
  chart: {},
  coinData: [], // TODO move to coins store
  currency: 'BTC',
  period: '1d',
  changePct: '0',
  lastTotal: 0,
};

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case PORTFOLIOS_UPDATE: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.data,
      };
    }
    case PORTFOLIO_ADDED: {
      return {
        ...state,
        error: null,
        loading: false,
        list: [ ...state.list, action.data ]
      };
    }
    case PORTFOLIO_SELECT: {
      return {
        ...state,
        selected: action.data || null
      };
    }
    case PORTFOLIO_REMOVED: {
      return {
        ...state,
        error: null,
        loading: false,
        selected: state.selected !== action.data ? state.selected : null,
        list: [...state.list.filter(portfolio => portfolio._id !== action.data)]
      };
    }
    case PORTFOLIO_UPDATE: {
      const { _id, title, inTotal } = action.data;
      return {
        ...state,
        error: null,
        loading: false,
        list: [...state.list.map(portfolio => {
          if (portfolio._id === _id) {
            portfolio.title = title;
            portfolio.inTotal = inTotal;
          }
          return portfolio;
        })]
      };
    }
    case TOTALS_REPLACE: {
      const { portfolioId, totals, changePct, lastTotal } = action.data;
      return {
        ...state,
        error: null,
        loading: false,
        chart: totals,
        changePct,
        lastTotal,
        // list: [...state.list.map(portfolio => {
        //   if (portfolio._id === portfolioId) {
        //     portfolio.changePct = changePct;
        //   }
        //   return portfolio;
        // })]
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
    case 'UPDATE_PERIOD': {
      return {
        ...state,
        period: action.data,
      };
    }
    default:
      return state;
  }
}
