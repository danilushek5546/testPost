import jwt from 'jsonwebtoken';
import type { Handler } from 'express';
import ApiError from '../error/ApiError';
import config from '../config';
import User from '../db/entities/models';

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

    const decoded = <jwt.ITypeJwtPayload>jwt.verify(token, config.secretKey);
    const id = Number(decoded.id);
    const user = await User.findOneBy({ id });

    req.body = user;

    next();
  } catch (error) {
    return next(error);
  }
};

export default isAuth;
