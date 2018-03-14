import { API_REQUEST } from './action.types';

/**
 * Action creator for API Request.
 * @kind Action
 * @param {string} method GET, POST, PUT or DELETE
 * @param {string} url
 * @param {Object} body of request
 * @param {string} onSuccess action if result success
 * @param {string} onError action if there is error
 */
export const apiRequest = (method, url, body, onSuccess, onError) => ({
  type: API_REQUEST,
  payload: body,
  meta: { method, url, onSuccess, onError }
});