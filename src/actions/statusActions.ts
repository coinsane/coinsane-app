import { AnyAction } from 'redux';

export enum ActionTypes {
  NETWORK_STATUS_CHANGE = 'status/NETWORK_STATUS_CHANGE',
  STATUS_REPLACE = 'status/STATUS_REPLACE',
}

export interface IStatusAction extends AnyAction {
  payload: any;
  type: ActionTypes.NETWORK_STATUS_CHANGE
    | ActionTypes.STATUS_REPLACE
    ;
}

export const networkStatusChange = status => ({
  type: ActionTypes.NETWORK_STATUS_CHANGE,
  payload: status,
});

export const appstatus = (dispatch, type, val) => (
  new Promise((resolve, reject) => {
    // Validate types
    const allowed = ['error', 'success', 'info', 'loading'];
    if (!allowed.includes(type)) {
      return reject('Type should be one of success, error or info');
    }

    // Set some defaults for convenience
    let message = val;
    if (!val) {
      if (type === 'success') message = 'Success';
      if (type === 'error') message = 'Sorry, an error occurred';
      if (type === 'info') message = 'Something is happening...';
      if (type === 'loading' && val !== false) message = true;
    }

    return resolve(dispatch({
      type: 'STATUS_REPLACE',
      [type]: message,
    }));
  })
);
