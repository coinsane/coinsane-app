import axios from 'axios';

/////////////////////////////////////////////////////////////////
/**
 * Api for get avaliable currencies. 
 * @kind API
 * @param limit: Number - limit result array
 */

export const fetchAvaliableCurrencies = async (limit) => {
  try {
    return await axios.get(`/search?type=currency&limit=${limit}`);
  } catch (e) {
      //yield put(fetchFailed(e));
      return;
  }
}