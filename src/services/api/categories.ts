import axios from 'axios';

export const fetchCategories = () => axios.get('/categories');
