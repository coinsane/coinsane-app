import axios from 'axios';

/**
 * Api for get all pages.
 * @kind API
 */

export const fetchPages = () => axios.get('/pages');
