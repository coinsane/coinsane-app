import Store from '../store/navigation';

export const initialState = Store;

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case 'DRAWER_ACTIONS': {
      return {
        ...state,
        drawer: action.data
      };
    }
    case 'SET_ACTIVE_MENU': {
      console.log('SET_ACTIVE_MENU');
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
