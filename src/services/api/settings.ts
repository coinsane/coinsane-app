import axios from 'axios';

export const addCurrency = currencyId => axios.post('/settings/currency', { currencyId });

export const removeCurrency = currencyId => axios.delete('/settings/currency', { data: { currencyId } });
