import {
  GET_PAGES_SUCCEED,
  GET_PAGES_ERROR,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  pages: {},
};

export default function marketsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PAGES_SUCCEED: {
      return {
        ...state,
        error: null,
        loading: false,
        pages: action.payload,
      };
    }
    case GET_PAGES_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
}
