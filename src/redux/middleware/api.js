import { API_REQUEST } from "../../actions/action.types";
import axios from 'axios';

// this middleware care only for API calls
export const api = ({dispatch}) => next => action => {
  
  if(action.type === API_REQUEST) {
    const { method, url, onSuccess, onError } = action.meta;
    let data = (method === 'POST') ? action.payload : undefined;

    axios({ url: url, method: method, data })
      .then((res) => { dispatch({ type: onSuccess, payload: res.data || {} }) })
      .catch(error => { dispatch({ type: onError, payload: error })})
  }
  return next(action);
  
};