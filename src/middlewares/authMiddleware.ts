import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';
import db from '../db';
import { verifyToken } from '../utils/tokenHelper';

const isAuth: Handler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new ApiError({ statusCode: StatusCodes.FORBIDDEN, message: 'token validation error' }));
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return next(new ApiError({ statusCode: StatusCodes.FORBIDDEN, message: 'token validation error' }));
    }

    const user = await db.user.findOneBy({ id: decodedToken.id });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user not found' }));
    }

    req.user = user!;

    next();
  } catch (error) {
    return next(error);
  }
};

export default isAuth;
