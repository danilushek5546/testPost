import type { ErrorRequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandle: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.payload.statusCode).json(err.payload);
  }

  console.error(err);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
};

export default errorHandle;
