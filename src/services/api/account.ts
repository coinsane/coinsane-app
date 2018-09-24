import axios from 'axios';

export const getSettings = () => axios.get('/settings');
