import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';

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
  fullName: string;
  dob: Date;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signUp: HandlerType = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const existingUser = await db.user.findOne({
      select: {
        email: true,
      },
      where: {
        email,
      },
    });

    if (existingUser) {
      return next(new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'user with this email is allready exists',
      }));
    }

    const hash = await createHash(password!);

    let user = db.user.create({
      email,
      password: hash,
    });
    user = await db.user.save(user);

    const token = generateToken(user.id);

    delete user.password;

    return res.json({ user, token });
  } catch (error) {
    return next(error);
  }
};

export default signUp;
