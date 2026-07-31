import type { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { http } from './http';
import { getAccessToken, getRefreshToken, setAccessToken, isTokenExpired } from './token';
import { parseApiError } from './response';
import { clearAllStores } from '@/stores';

const activeAbortControllers = new Set<AbortController>();

export function cancelAllPendingRequests() {
  activeAbortControllers.forEach((controller) => {
    controller.abort();
  });
  activeAbortControllers.clear();
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

export function setupInterceptors() {
  // Request Interceptor
  http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const controller = new AbortController();
      config.signal = controller.signal;
      activeAbortControllers.add(controller);

      const token = getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: Error) => Promise.reject(error)
  );

  // Response Interceptor
  http.interceptors.response.use(
    (response) => {
      if (response.config.signal) {
        // Remove controller from active set when request succeeds
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return http(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getRefreshToken();
        if (refreshToken && !isTokenExpired(refreshToken)) {
          try {
            const refreshResponse = await http.post('/v1/auth/refresh', { refreshToken });
            const newAccessToken =
              refreshResponse.data?.data?.accessToken || refreshResponse.data?.accessToken;

            if (newAccessToken) {
              setAccessToken(newAccessToken);
              processQueue(null, newAccessToken);
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              }
              return http(originalRequest);
            }
          } catch (refreshErr) {
            processQueue(refreshErr, null);
            clearAllStores();
            return Promise.reject(parseApiError(refreshErr));
          } finally {
            isRefreshing = false;
          }
        }

        // Refresh token missing or expired -> clear session
        isRefreshing = false;
        clearAllStores();
      }

      return Promise.reject(parseApiError(error));
    }
  );
}

// Automatically setup interceptors on import
setupInterceptors();
