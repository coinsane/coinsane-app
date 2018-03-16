import { DRAWER_ACTIONS, SET_ACTIVE_MENU } from './action.types';
/**
  * Set drawer
  */
export function setDrawerActions(open, close) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: DRAWER_ACTIONS,
      data: { open, close },
    }))
    .catch(e => console.log(e));
}
/**
  * Set active menu
  */
export function setActiveMenu(data) {
  return dispatch => Promise.resolve()
    .then(() => dispatch({
      type: SET_ACTIVE_MENU,
      data
    }))
    .catch(e => console.log(e));
}
