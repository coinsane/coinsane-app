import { 
  UPDATE_TRANSACTION,
  GET_COURSE_SUCCESS,
  CLEAR_TRANSACTION,
  RECALCULATE
} from '../../actions/action.types';
export const initialState = {
  transaction: {
    coin: '',
    portfolio: '',
    date: new Date(),
    buy: true,
    price: '0',
    amount: '0',
    total: '0',
    currency: '',
    market: '',
    category: '',
    note: '',
    coinItem: {},
    portfolioItem: {},
    currencyItem: {}
  }
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TRANSACTION: {
      return {
        ...state,
        transaction: {
          ...state.transaction,
          ...action.payload
        }
      };
    }
    case GET_COURSE_SUCCESS: {
      return {
        ...state,
        transaction: {
          ...state.transaction,
          price: action.payload
        }
      };
    }
    case CLEAR_TRANSACTION: {
      return {
        ...state,
        transaction: {
          ...state.transaction,
          amount: 0,
          total: 0
        }
      };
    }
    default:
      return state;
  }
}


function round(number, n) {
  let k = 10**n;
  return Math.round(number * k) / k;
}
