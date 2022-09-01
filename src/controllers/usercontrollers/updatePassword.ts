import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createHash } from '../../utils/hash';
import ApiError from '../../utils/ApiError';
import db from '../../db';

type ParamsType = Record<string, never>;

type ResponseType = {
  message: string;
};

type BodyType = {
  oldPassword: string;
  newPassword: string;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updatePassword: HandlerType = async (req, res, next) => {
  try {
    const {
      oldPassword,
      newPassword,
    } = req.body;

    const id = req.user?.id || 0;

    const user = await db.user.findOne({
      select: {
        password: true,
      },
      where: {
        id: +id,
      },
    });

    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user not found' }));
    }

    const oldHash = await createHash(oldPassword);

    if (oldHash !== user.password) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'wrong password' }));
    }

    const newHash = await createHash(newPassword);

    user.password = newHash;
    await db.user.save(user);

    delete user.password;
    return res.json({ message: 'Password successfully changed' });
  } catch (error) {
    return next(error);
  }
};

export default updatePassword;
