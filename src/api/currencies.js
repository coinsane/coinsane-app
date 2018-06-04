import axios from 'axios';

/**
 * Api for get available currencies.
 * @kind API
 * @param q: String - search string input
 * @param limit: Number - limit result array
 * @param skip: Number - skip result array
 * @param type: String - can be market, currency or null for both
 */

export const fetchAvailableCurrencies = ({
  q,
  limit = 10,
  skip = 0,
  type = 'currency',
}) => axios.get('/search', {
  params: {
    q: q.toLowerCase(),
    limit,
    skip,
    type,
  },
});
