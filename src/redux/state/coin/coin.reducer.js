import { 
  COINS_REPLACE, 
  COIN_HISTO_UPDATE, 
  COIN_HISTO_UPDATE_SUCCESS,
  COINS_ERROR
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: [],
};

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case COIN_HISTO_UPDATE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload.data,
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
