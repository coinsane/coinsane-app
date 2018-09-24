import { AnyAction } from 'redux';

export enum ActionTypes {
  DRAWER_ACTIONS = 'navigation/DRAWER_ACTIONS',
  SET_ACTIVE_MENU = 'navigation/SET_ACTIVE_MENU',
  DRAWER_CLOSE = 'navigation/DRAWER_CLOSE',
}

export interface INavigationAction extends AnyAction {
  payload: any;
  type: ActionTypes.DRAWER_ACTIONS
    | ActionTypes.SET_ACTIVE_MENU
    | ActionTypes.DRAWER_CLOSE
    ;
}

export const setDrawerClose = payload => ({ type: ActionTypes.DRAWER_CLOSE, payload });

export const setDrawerActions = payload => ({ type: ActionTypes.DRAWER_ACTIONS, payload });

export const setActiveMenu = data => ({ type: ActionTypes.SET_ACTIVE_MENU, data });
