import { page as pageActions } from 'src/actions';
import { IPageState } from 'src/models';

export const initialState: IPageState = {
  loading: true,
  error: null,
  items: {},
};

export default (
  state: IPageState = initialState,
  action: pageActions.IPageAction,
): IPageState => {
  switch (action.type) {
    case pageActions.ActionTypes.GET_PAGES_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        items: action.payload,
      };
    }
    case pageActions.ActionTypes.GET_PAGES_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
};
