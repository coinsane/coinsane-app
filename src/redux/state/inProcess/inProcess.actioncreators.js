import { 
  UPDATE_TRANSACTION,
  CLEAR_TRANSACTION,
  RECALCULATE
} from '../../actions/action.types';

/////////////////////////////////////////////////////////////////

// payload format correspond to inProcess peace of state, all propTypes
// in payload will be updated with spread operator - { portfolioId: 'qweqweqweqwe' }
// state = { ...state, ...payload }
export const updateProccessTransaction = (payload) => {
  return { type: UPDATE_TRANSACTION, payload: payload };
}

export const clearProccessTransaction = () => {
  return { type: CLEAR_TRANSACTION, payload: {} };
}

export const recalculate = (payload) => {
  return { type: RECALCULATE, payload: payload };
}
