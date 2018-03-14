import Store from '../store/coins';
import { COINS_REPLACE, COIN_HISTO_UPDATE, COINS_ERROR, GET_AVALIABLE_COINS_SUCCESS, GET_AVALIABLE_COINS_ERROR } from '../actions/action.types';

export const initialState = Store;

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AVALIABLE_COINS_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload,
      };
    }
    case COIN_HISTO_UPDATE: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.data,
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
