import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';

type ParamsType = {
  userId: string;
};

type ResponseType = Record<string, never>;

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteMany: HandlerType = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const existInCart = await db.cart.find({
      where: {
        userId: +userId,
      },
    });
    if (!existInCart) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'cart is empty' }));
    }

    await db.cart.remove(existInCart);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    return next(error);
  }
};

export default deleteMany;
