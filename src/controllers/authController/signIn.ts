import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createHash } from '../../utils/hash';
import ApiError from '../../utils/ApiError';
import db from '../../db';
import type User from '../../db/entities/User';
import { generateToken } from '../../utils/tokenHelper';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
  token: string;
};

type BodyType = {
  email: string;
  password: string;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signIn: HandlerType = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await db.user.findOne({
      select: {
        id: true,
        password: true,
        email: true,
        fullName: true,
        dob: true,
      },
      where: {
        email,
      },
    });

    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user with this email not found' }));
    }

    const comparePassword = await createHash(password);
    if (user.password !== comparePassword) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'wrong password' }));
    }

    const token = generateToken(user.id);

    delete user.password;
    return res.json({ user, token });
  } catch (error) {
    return next(error);
  }
};

export default signIn;
