import type { Handler } from 'express';
import ApiError from '../utils/ApiError';
import db from '../db';
import { verifyToken } from '../utils/tokenHelper';

const isAuth: Handler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new ApiError({ statusCode: 404, message: 'user not found' }));
    }

    const decodedToken = await verifyToken(token);
    const user = await db.user.findOneBy({ id: decodedToken.id });

    req.user = user!;

    next();
  } catch (error) {
    return next(error);
  }
};

export default isAuth;
