import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import ApiError from '../../utils/ApiError';
import db from '../../db';
import type User from '../../db/entities/User';
import { createHash } from '../../utils/hash';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
};

type BodyType = {
  email: string;
  password: string;
  fullName: string;
  dob: Date;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const createUser: HandlerType = async (req, res, next) => {
  try {
    const {
      email,
      fullName,
      dob,
      password,
    } = req.body;

    const isEmailNotUnique = await db.user.findOne({
      select: {
        email: true,
      },
      where: {
        email,
      },
    });

    if (isEmailNotUnique) {
      return next(new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'user with this email is allready exists',
      }));
    }

    const hash = await createHash(password || '');

    let user = db.user.create({
      fullName,
      email,
      dob: new Date(dob),
      password: hash,
    });
    user = await db.user.save(user);

    delete user.password;
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default createUser;
