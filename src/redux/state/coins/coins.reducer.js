import { 
  COINS_REPLACE, 
  COIN_HISTO_UPDATE, 
  COINS_ERROR
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: [],
};

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
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
