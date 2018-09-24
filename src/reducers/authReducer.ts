import axios from 'axios';
import * as DeviceInfo from 'react-native-device-info';

import Config from 'src/constants/config';
import { GET_TOKEN, GET_TOKEN_SUCCEED, GET_TOKEN_ERROR } from '../redux/actions/action.types';

export const initialState = {
  loading: false,
  error: null,
  token: null,
};

export default function actionReducer(state = initialState, action) {
  const deviceId = DeviceInfo.getUniqueID();

  switch (action.type) {
    case GET_TOKEN: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case GET_TOKEN_SUCCEED: {
      axios.defaults.headers.common.Authorization = `${Config.appName} token=${action.token} deviceId=${deviceId}`;
      return {
        ...state,
        loading: false,
        error: null,
        token: action.token,
      };
    }
    case GET_TOKEN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        // token: null,
      };
    }

    case 'USER_LOGIN': {
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
    case 'USER_DETAILS_UPDATE': {
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
    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'USER_RESET': {
      return initialState;
    }
    default:
      return state;
  }
}
