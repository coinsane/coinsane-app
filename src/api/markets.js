import axios from 'axios';

/**
 * Api for get available markets.
 * @kind API
 * @param limit: Number - limit result array
 * @param offset: Number - offset result array
 */

export const fetchAvailableMarkets = ({ limit, offset }) => axios.get('/market', { params: { limit, offset } });

/**
 * Api for get market cap.
 * @kind API
 */

export const getMarketCap = convert => axios.get('/market/cap', { params: { convert } });

/**
 * Api for search available markets.
 * @kind API
 * @param q: String - search string input
 * @param type: String - can be market, currency or null for both
 */

export const searchAvailableMarkets = (q, type) => axios.get('/search', { params: { q, type } });
