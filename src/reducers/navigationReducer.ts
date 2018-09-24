import I18n from 'src/i18n';
import { DRAWER_ACTIONS, SET_ACTIVE_MENU, DRAWER_CLOSE } from '../redux/actions/action.types';

export const initialState = {
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

export default function actionReducer(state = initialState, action) {
  switch (action.type) {
    case DRAWER_CLOSE:
      return {
        ...state,
        loading: action.payload,
      };
    case DRAWER_ACTIONS: {
      return {
        ...state,
        drawer: action.payload,
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
