import { api } from './api';

export const dataService = {
  store: async (data: any, apiKey: string) => {
    const response = await api.post('/data', { data }, {
      headers: {
        'X-API-Key': apiKey,
      },
    });
    return response.data;
  },

  retrieve: async (apiKey: string) => {
    const response = await api.get('/data', {
      headers: {
        'X-API-Key': apiKey,
      },
    });
    return response.data;
  },
};