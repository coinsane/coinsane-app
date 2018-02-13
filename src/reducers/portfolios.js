import Store from '../store/portfolios';

export const initialState = Store;

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case 'PORTFOLIOS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.data,
      };
    }
    case 'PORTFOLIO_ADDED': {
      return {
        ...state,
        error: null,
        loading: false,
        list: [ ...state.list, action.data ]
      };
    }
    case 'PORTFOLIO_SELECT': {
      return {
        ...state,
        selected: action.data
      };
    }
    case 'PORTFOLIO_REMOVED': {
      return {
        ...state,
        error: null,
        loading: false,
        selected: state.selected !== action.data ? state.selected : null,
        list: [...state.list.filter(portfolio => portfolio.id !== action.data)]
      };
    }
    case 'PORTFOLIO_UPDATE': {
      const { id, title, inTotal } = action.data;
      return {
        ...state,
        error: null,
        loading: false,
        list: [...state.list.map(portfolio => {
          if (portfolio.id === id) {
            portfolio.title = title;
            portfolio.inTotal = inTotal;
          }
          return portfolio;
        })]
      };
    }
    case 'PORTFOLIO_COIN_REMOVED': {
      const { coinId, portfolioId } = action.data;
      return {
        ...state,
        error: null,
        loading: false,
        list: [...state.list.map(portfolio => {
          if (portfolio.id === portfolioId) {
            portfolio.coins = portfolio.coins.filter(coin => coin.id !== coinId);
          }
          return portfolio;
        })]
      };
    }
    case 'PORTFOLIOS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'DRAWER_ACTIONS': {
      return {
        ...state,
        drawer: action.data
      };
    }
    default:
      return state;
  }
}
