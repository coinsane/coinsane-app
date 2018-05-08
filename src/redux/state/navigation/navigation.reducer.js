import { DRAWER_ACTIONS, SET_ACTIVE_MENU } from '../../actions/action.types';

export const initialState = {
  menu: [
    {
      scene: 'coins',
      icon: 'Portfolio',
      text: 'Portfolio',
      active: true,
    },
    {
      scene: 'market',
      icon: 'Market',
      text: 'Markets',
    },
    // {
    //   scene: 'watchlist',
    //   icon: 'Watchlist',
    //   text: 'Watchlist',
    // },
    {
      scene: 'profile',
      icon: 'Settings',
      text: 'Settings',
    },
  ],
  drawer: {},
};

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case DRAWER_ACTIONS: {
      return {
        ...state,
        drawer: action.data
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
