import { Response } from 'express';

export interface ApiResponseData<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
  meta?: any;
}

export class ApiResponse {
  static success<T>(res: Response, statusCode = 200, data?: T, message?: string, meta?: any) {
    const responsePayload: ApiResponseData<T> = {
      success: true,
      message,
      data,
      meta,
    };
    return res.status(statusCode).json(responsePayload);
  }

  static created<T>(res: Response, data?: T, message = 'Resource created successfully') {
    return ApiResponse.success(res, 201, data, message);
  }

  static error(res: Response, statusCode = 500, message = 'An error occurred', errors?: any[]) {
    const responsePayload: ApiResponseData = {
      success: false,
      error: message,
      errors,
    };
    return res.status(statusCode).json(responsePayload);
  }
}
