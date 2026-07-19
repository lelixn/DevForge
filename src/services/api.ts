import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const API_TIMEOUT = 15000; // 15 seconds

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if present
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('devforge_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g. Session Expired)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle Token Expiry (401 Unauthorized)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.headers.get('X-Retry')
    ) {
      // In production, you would trigger token refresh flows here
      // localStorage.removeItem('devforge_auth_token');
      // window.location.href = '/login';
    }

    // Parse friendly error messages
    const apiError = {
      message:
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        'An unexpected network error occurred.',
      status: error.response?.status,
      code: error.code,
    };

    return Promise.reject(apiError);
  }
);
