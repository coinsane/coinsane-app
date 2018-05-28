import axios from 'axios';

/**
 * Api for get available markets.
 * @kind API
 * @param limit: Number - limit result array
 * @param skip: Number - skip result array
 */

export const fetchAvailableMarkets = ({ limit = 10, skip = 0 }) => axios.get('/market', { params: { limit, skip } });

/**
 * Api for get market cap.
 * @kind API
 */

export const getMarketCap = convert => axios.get('/market/cap', { params: { convert } });

/**
 * Api for search available markets.
 * @kind API
 * @param q: String - search string input
 * @param limit: Number - limit result array
 * @param skip: Number - skip result array
 * @param type: String - can be market, currency or null for both
 */

export const searchAvailableMarkets = ({
  q,
  limit = 10,
  skip = 0,
  type = 'market',
}) => axios.get('/search', {
  params: {
    q: q.toLowerCase(),
    limit,
    skip,
    type,
  },
});
