import {
  GET_PAGES_SUCCESS,
  GET_PAGES_ERROR,
} from '../redux/actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  items: {},
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PAGES_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        items: action.payload,
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
