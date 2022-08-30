import jwt from 'jsonwebtoken';
import type { Handler } from 'express';
import ApiError from '../error/ApiError';
import config from '../config';
import db from '../db';

declare module 'jsonwebtoken' {
  export interface ITypeJwtPayload extends jwt.JwtPayload {
    id: number;
    email: string;
  }
}

const isAuth: Handler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new ApiError({ statusCode: 404, message: 'user not found' }));
    }

    const decoded = jwt.verify(token, config.token.secretKey) as { id: number; email: string };
    const user = await db.user.findOneBy({ id: decoded.id });

    req.user = user!;

    next();
  } catch (error) {
    return next(error);
  }
};

export default isAuth;
