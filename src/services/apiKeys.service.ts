import { api } from './api';
import { ApiKeyResponse } from '../types';

export const apiKeysService = {
  generate: async (): Promise<ApiKeyResponse> => {
    const response = await api.post('/keys/generate');
    return response.data;
  },

  list: async () => {
    const response = await api.get('/keys/list');
    return response.data;
  },
};