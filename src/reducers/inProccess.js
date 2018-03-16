import { UPDATE_TRANSACTION } from '../actions/action.types';
export const initialState = {
  transaction: {}
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TRANSACTION: {
      return {
        ...state,
        transaction: {
          ...state.transaction,
          ...action.payload
        }
      };
    }
    default:
      return state;
  }
}
