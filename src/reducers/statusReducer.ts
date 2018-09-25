import { statusActions } from 'src/actions';
import { IStatusState } from 'src/models';

export const initialState: IStatusState = {
  loading: false,
  info: '',
  error: false,
  success: true,
  network: true,
};

export default (
  state: IStatusState = initialState,
  action: statusActions.IStatusAction,
): IStatusState => {
  switch (action.type) {
    case statusActions.ActionTypes.STATUS_REPLACE: {
      return {
        ...state,
        loading: action.loading || false,
        info: action.info || '',
        error: action.error || false,
        success: action.success || false,
      };
    }
    case statusActions.ActionTypes.NETWORK_STATUS_CHANGE:
      return {
        ...state,
        network: action.payload || false,
      };
    default:
      return state;
  }
};
