import { api } from './api';
import { User, AuthResponse } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (email: string, password: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/signup', { email, password });
    return response.data;
  },

  verifyEmail: async (email: string, otp: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/verify-email', { email, otp });
    return response.data;
  },
};