import axios from 'axios';
import * as DeviceInfo from 'react-native-device-info';

import { auth as authActions } from 'src/actions';
import { IAuthState } from 'src/models';

import Config from 'src/constants/config';

export const initialState: IAuthState = {
  error: '',
  loading: false,
  token: '',
};

export default (
  state: IAuthState = initialState,
  action: authActions.IAuthAction,
): IAuthState => {
  const deviceId = DeviceInfo.getUniqueID();

  switch (action.type) {
    case authActions.ActionTypes.GET_TOKEN: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case authActions.ActionTypes.GET_TOKEN_SUCCEED: {
      axios.defaults.headers.common.Authorization = `${Config.appName} token=${action.token} deviceId=${deviceId}`;
      return {
        ...state,
        loading: false,
        error: null,
        token: action.token,
      };
    }
    case authActions.ActionTypes.GET_TOKEN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        // token: null,
      };
    }

    case authActions.ActionTypes.USER_LOGIN: {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          uid: action.data.uid,
          email: action.data.email,
          emailVerified: action.data.emailVerified,
        };
      }
      return initialState;
    }
    case authActions.ActionTypes.USER_DETAILS_UPDATE: {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          signedUp: action.data.signedUp,
          role: action.data.role,
        };
      }
      return initialState;
    }
    case authActions.ActionTypes.USER_ERROR: {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case authActions.ActionTypes.USER_RESET: {
      return initialState;
    }
    default:
      return state;
  }
};
