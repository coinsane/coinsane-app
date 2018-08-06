import { NETWORK_STATUS_CHANGE } from '../../actions/action.types';

export const initialState = {
  loading: false,
  info: null,
  error: null,
  success: null,
  network: null,
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case 'STATUS_REPLACE': {
      return {
        ...state,
        loading: action.loading || false,
        info: action.info || null,
        error: action.error || null,
        success: action.success || null,
      };
    }
    case NETWORK_STATUS_CHANGE:
      return {
        ...state,
        network: action.payload,
      };
    default:
      return state;
  }
}
