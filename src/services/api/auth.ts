import axios from 'axios';

export const getToken = params => axios.get('/auth/getToken', { params });
