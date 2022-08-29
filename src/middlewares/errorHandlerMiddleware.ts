import type { ErrorRequestHandler } from 'express';
import ApiError from '../error/ApiError';

const errorHandle: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.payload.statusCode).json(err.payload);
  }

  return res.status(500).json({ message: 'internal server error' });
};

export default errorHandle;
