import { GET_SETTINGS_SUCCEED } from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  currencies: {},
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SETTINGS_SUCCEED: {
      return {
        ...state,
        error: null,
        loading: false,
        currencies: action.payload.currencies,
      };
    }
    default:
      return state;
  }
}
