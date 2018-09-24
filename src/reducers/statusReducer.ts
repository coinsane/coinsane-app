import { NETWORK_STATUS_CHANGE } from '../redux/actions/action.types';

export const initialState = {
  loading: false,
  info: '',
  error: false,
  success: true,
  network: true,
};

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case 'STATUS_REPLACE': {
      return {
        ...state,
        loading: action.loading || false,
        info: action.info || '',
        error: action.error || false,
        success: action.success || false,
      };
    }
    case NETWORK_STATUS_CHANGE:
      return {
        ...state,
        network: action.payload || false,
      };
    default:
      return state;
  }
}
