import {
  DRAWER_ACTIONS,
  SET_ACTIVE_MENU,
  DRAWER_CLOSE,
} from '../../actions/action.types';

/**
  * Set drawer
  */
export const setDrawerClose = payload => ({ type: DRAWER_CLOSE, payload });

/**
  * Set drawer
  */
export const setDrawerActions = payload => ({ type: DRAWER_ACTIONS, payload });

/**
  * Set active menu
  */
export const setActiveMenu = data => ({ type: SET_ACTIVE_MENU, data });
