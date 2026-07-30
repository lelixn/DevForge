import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, [], false, err.stack);
  }

  logger.error(`[${req.method}] ${req.path} >> Status: ${error.statusCode} - ${error.message}`);

  return ApiResponse.error(res, error.statusCode, error.message, error.errors);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(ApiError.notFound(`Route not found: ${req.originalUrl}`));
};
