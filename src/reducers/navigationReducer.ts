import { navigationActions } from 'src/actions';
import { INavigationState } from 'src/models';

import I18n from 'src/i18n';

export const initialState: INavigationState = {
  menu: [
    {
      scene: 'coins',
      icon: 'Portfolio',
      text: I18n.t('navigation.portfolio'),
      active: true,
    },
    {
      scene: 'market',
      icon: 'Market',
      text: I18n.t('navigation.markets'),
      active: false,
    },
    {
      scene: 'settings',
      icon: 'Settings',
      text: I18n.t('navigation.settings'),
      active: false,
    },
  ],
  drawer: {},
  loading: false,
};

export default (
  state: INavigationState = initialState,
  action: navigationActions.INavigationAction,
): INavigationState => {
  switch (action.type) {
    case navigationActions.ActionTypes.DRAWER_CLOSE:
      return {
        ...state,
        loading: action.payload,
      };
    case navigationActions.ActionTypes.DRAWER_ACTIONS: {
      return {
        ...state,
        drawer: action.payload,
      };
    }
    case navigationActions.ActionTypes.SET_ACTIVE_MENU: {
      return {
        ...state,
        menu: [...state.menu.map((item) => {
          item.active = (item.scene === action.data);
          return item;
        })],
      };
    }
    default:
      return state;
  }
};
