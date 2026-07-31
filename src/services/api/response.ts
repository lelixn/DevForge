export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  statusCode: number;
  timestamp?: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  fieldErrors?: Record<string, string>;
  timestamp?: string;
}

export function parseApiError(error: unknown): ApiErrorResponse {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosErr = error as {
      response?: { data?: Partial<ApiErrorResponse>; status?: number };
      message?: string;
      code?: string;
    };

    if (axiosErr.response?.data) {
      return {
        message: axiosErr.response.data.message || 'An error occurred during the API request.',
        statusCode: axiosErr.response.status || 500,
        error: axiosErr.response.data.error,
        fieldErrors: axiosErr.response.data.fieldErrors,
      };
    }

    return {
      message: axiosErr.message || 'A network error occurred while connecting to DevForge backend.',
      statusCode: axiosErr.response?.status || 500,
      error: axiosErr.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: 'An unexpected authentication or network error occurred.',
    statusCode: 500,
  };
}
