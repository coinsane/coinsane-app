import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
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
    case GET_CATEGORIES: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case GET_CATEGORIES_SUCCESS: {
      const items = { ...state.items };
      const list = action.payload.categories.map((category) => {
        items[category._id] = category;
        return category._id;
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
