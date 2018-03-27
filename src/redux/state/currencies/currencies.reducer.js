import { 
  GET_AVALIABLE_CURRENCIES_SUCCESS
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  list: []
};

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AVALIABLE_CURRENCIES_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload.response.result,
      };
    }
    default:
      return state;
  }
}
