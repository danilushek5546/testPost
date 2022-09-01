import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type User from '../../db/entities/User';
import db from '../../db';
import ApiError from '../../utils/ApiError';

type ParamsType = {
  id: string;
};

type ResponseType = {
  user: User;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getOneUser: HandlerType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await db.user.findOneBy({
      id: +id,
    });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user not found' }));
    }

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default getOneUser;
