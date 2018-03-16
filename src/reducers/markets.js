import { 
  CLEAR_MARKETS, 
  GET_SEARCHED_MARKETS_SUCCESS,
  GET_AVALIABLE_MARKETS_SUCCESS, 
  GET_AVALIABLE_MARKETS_ERROR 
} from '../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: []
};

export default function marketsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AVALIABLE_MARKETS_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload.response.result,
      };
    }
    case GET_SEARCHED_MARKETS_SUCCESS: {
      console.log(action.payload.response.result);
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload.response.result,
      };
    }
    case CLEAR_MARKETS: {
      return {
        ...state,
        list: []
      };
    }
    default:
      return state;
  }
}
