import { category as categoryActions } from 'src/actions';
import { ICategoryState } from 'src/models';

export const initialState: ICategoryState = {
  loading: true,
  error: null,
  refreshing: false,
  items: {},
  list: [],
};

export default (
  state: ICategoryState = initialState,
  action: categoryActions.ICategoryAction,
): ICategoryState => {
  switch (action.type) {
    case categoryActions.ActionTypes.GET_CATEGORIES: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case categoryActions.ActionTypes.GET_CATEGORIES_SUCCESS: {
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
};
