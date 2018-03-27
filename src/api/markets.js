import axios from 'axios';

/////////////////////////////////////////////////////////////////
/**
 * Api for get avaliable markets. 
 * @kind API
 * @param limit: Number - limit result array
 */

export const fetchAvaliableMarkets = async (limit) => {
  try {
    return await axios.get(`/market?limit=${limit}`);
  } catch (e) {
      //yield put(fetchFailed(e));
      return;
  }
}

/////////////////////////////////////////////////////////////////
/**
 * Api for search avaliable markets. 
 * @kind API
 * @param term: String - search string input
 */

export const searchAvaliableMarkets = async (term) => {
  try {
    return await axios.get(`/search?type=market&q=${term}`);
  } catch (e) {
      //yield put(fetchFailed(e));
      return;
  }
}