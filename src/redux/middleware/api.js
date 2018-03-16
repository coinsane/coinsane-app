import { API_REQUEST } from "../../actions/action.types";
import axios from 'axios';

// this middleware care only for API calls
export const api = ({dispatch}) => next => action => {
  
  if(action.type === API_REQUEST) {
    const { method, url, onSuccess, onError } = action.meta;

    axios({ url: url, method: method })
      .then((res) => dispatch({ type: onSuccess, payload: res.data.response.result || [] }))
      .catch(error => dispatch({ type: onError, payload: error }))
  }
  return next(action);
  
};