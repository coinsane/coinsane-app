import { CHECK_TOKEN, GET_TOKEN, GET_TOKEN_SUCCEED, GET_TOKEN_ERROR } from '../../actions/action.types';
import { apiRequest } from '../../actions/api';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Config from '../../constants/config';

// this middleware only care about the [auth] actions
export const tokenFlow = ({dispatch}) => next => action => {
  
  switch(action.type) {
    case CHECK_TOKEN:
      axios.defaults.baseURL = Config.apiUri;
      let token = AsyncStorage.getItem('token');
      
      if (token !== null) {
        axios.defaults.headers.common['Authorization'] = `${Config.appName} token=${token}`;
      } else {
        dispatch({ type: GET_TOKEN })
      }
      break;
    case GET_TOKEN:
      dispatch(apiRequest('GET', 'https://api.coinsane.tech/auth/getToken', null, GET_TOKEN_SUCCEED, GET_TOKEN_ERROR));
      break;
    case GET_TOKEN_SUCCEED:
      AsyncStorage.setItem('token', action.payload.result.token);
      axios.defaults.headers.common['Authorization'] = `${Config.appName} token=${action.payload.result.token}`;
      console.log(`${Config.appName} token=${action.payload.result.token}`);
      break;
  }
  
  return next(action);

};

export default { tokenFlow };