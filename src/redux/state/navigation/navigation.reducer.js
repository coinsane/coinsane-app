import I18n from '../../../i18n';
import { DRAWER_ACTIONS, SET_ACTIVE_MENU } from '../../actions/action.types';

export const initialState = {
  menu: [
    {
      scene: 'coins',
      icon: 'Portfolio',
      text: I18n.t('navigation_portfolio'),
      active: true,
    },
    {
      scene: 'market',
      icon: 'Market',
      text: I18n.t('navigation_markets'),
      active: false,
    },
    {
      scene: 'profile',
      icon: 'Settings',
      text: I18n.t('navigation_settings'),
      active: false,
    },
  ],
  drawer: {},
};

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case DRAWER_ACTIONS: {
      return {
        ...state,
        drawer: action.data,
      };
    }
    case SET_ACTIVE_MENU: {
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
}
