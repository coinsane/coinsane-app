import axios from 'axios';

/**
 * Api for get avaliable markets.
 * @kind API
 * @param limit: Number - limit result array
 */

export const fetchAvailableMarkets = limit => axios.get('/market', { params: { limit } });

/**
 * Api for search avaliable markets.
 * @kind API
 * @param term: String - search string input
 * @param type: String - can be market, currency or null for both
 */

export const searchAvailableMarkets = (term, type) => axios.get('/search', { params: { term, type } });