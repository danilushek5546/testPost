import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';

type ParamsType = {
  id: string;
};

type ResponseType = Record<string, never>;

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteUser: HandlerType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await db.user.findOneBy({
      id: +id,
    });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'user not found' }));
    }

    await db.user.remove(user);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    return next(error);
  }
};

export default deleteUser;
