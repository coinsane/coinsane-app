import {
  GET_AVAILABLE_CURRENCIES_SUCCESS,
} from '../../actions/action.types';

export const initialState = {
  loading: true,
  error: null,
  refreshing: false,
  items: {},
  list: [],
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABLE_CURRENCIES_SUCCESS: {
      const items = { ...state.items };
      const list = action.payload.list.map((market) => {
        items[market._id] = market;
        return market._id;
      });
      return {
        ...state,
        error: null,
        loading: false,
        items,
        list,
      };
    }
    default:
      return state;
  }
}
