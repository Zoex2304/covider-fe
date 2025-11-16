// ============================================================================
// FILE: src/services/api/client.ts (ENHANCED)
// ============================================================================
import axios, { AxiosError } from 'axios';
import { getErrorMessage } from '@/utils/errorHandling';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with enhanced error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error('Network Error:', {
        message: error.message,
        url: error.config?.url,
      });
    } else {
      console.error('Error:', error.message);
    }
    
    const message = getErrorMessage(error);
    return Promise.reject(new Error(message));
  }
);

