import { 
  UPDATE_TRANSACTION
} from './action.types';

/////////////////////////////////////////////////////////////////

// payload format correspond to inProccess peace of state, all propTypes
// in payload will be updated with spread operator - { portfolioId: 'qweqweqweqwe' }
// state = { ...state, ...payload }
export const updateProccessTransaction = (payload) => dispatch => {
  dispatch({ type: UPDATE_TRANSACTION, payload: payload });
}
