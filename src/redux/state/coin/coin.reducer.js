import {
  COINS_REPLACE,
  COIN_HISTO_UPDATE,
  COIN_HISTO_UPDATE_SUCCESS,
  COINS_ERROR,
  GET_AVALIABLE_TRANSACTIONS_SUCCESS
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: {},
  transactions: [],
};

export default function coinReducer(state = initialState, action) {
  switch (action.type) {
    case COIN_HISTO_UPDATE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload.data,
      };
    }
    case GET_AVALIABLE_TRANSACTIONS_SUCCESS: {
      console.log('actionactionactionactionaction', action)
      return {
        ...state,
        error: null,
        loading: false,
        transactions: action.payload,
      };
    }
    case COINS_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    default:
      return state;
  }
}
