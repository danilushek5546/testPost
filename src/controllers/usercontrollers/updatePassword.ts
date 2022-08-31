import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import ApiError from '../../utils/ApiError';
import db from '../../db';
import { decodeHash, encodeHash } from '../../utils/hash';

type ParamsType = {
  id: string;
};

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
    const { id } = req.params;
    const {
      oldPassword,
      newPassword,
    } = req.body;

    const user = await db.user.findOneBy({
      id: +id,
    });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'user not found' }));
    }

    const decryptPassword:string = decodeHash(user.password!);

    if (oldPassword !== decryptPassword) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'wrong password' }));
    }

    const newHash:string = encodeHash(newPassword);

    user.password = newHash;
    await db.user.save(user);

    delete user.password;
    return res.json({ message: 'Password successfully changed' });
  } catch (error) {
    return next(error);
  }
};

export default updatePassword;
