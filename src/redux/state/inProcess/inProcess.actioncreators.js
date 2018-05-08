import { UPDATE_TRANSACTION, CLEAR_TRANSACTION, RECALCULATE } from '../../actions/action.types';

export const updateProcessTransaction = payload => ({ type: UPDATE_TRANSACTION, payload });

export const clearProcessTransaction = () => ({ type: CLEAR_TRANSACTION, payload: {} });

export const recalculate = payload => ({ type: RECALCULATE, payload });
