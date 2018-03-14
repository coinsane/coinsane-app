import Store from '../store/navigation';
import { DRAWER_ACTIONS, SET_ACTIVE_MENU } from '../actions/action.types';

export const initialState = Store;

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case DRAWER_ACTIONS: {
      console.log(action);
      return {
        ...state,
        drawer: action.data
      };
    }
    case SET_ACTIVE_MENU: {
      return {
        ...state,
        menu: [...state.menu.map(item => {
          item.active = (item.scene === action.data)
          return item;
        })]
      };
    }
    default:
      return state;
  }
}
