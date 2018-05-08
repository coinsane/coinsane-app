import { GET_SETTINGS } from '../../actions/action.types';

/**
  * Get User Settings
  */
export function getSettings() {
  return {
    type: GET_SETTINGS,
  };
}
