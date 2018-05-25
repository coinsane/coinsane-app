import axios from 'axios';

/**
 * Api for get avaliable markets.
 * @kind API
 * @param limit: Number - limit result array
 */

export const fetchAvailableMarkets = limit => axios.get('/market', { params: { limit } });

/**
 * Api for get market cap.
 * @kind API
 */

export const getMarketCap = convert => axios.get('/market/cap', { params: { convert } });

/**
 * Api for search avaliable markets.
 * @kind API
 * @param term: String - search string input
 * @param type: String - can be market, currency or null for both
 */

export const searchAvailableMarkets = (q, type) => axios.get('/search', { params: { q, type } });
