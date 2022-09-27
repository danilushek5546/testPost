import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';

type ParamsType = Record<string, never>;

type ResponseType = Record<string, never>;

type BodyType = Record<string, never>;

type QueryType = {
  userId: number;
  bookId: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteOne: HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId } = req.query;

    const existInCart = await db.cart.createQueryBuilder('Cart')
      .where('Cart.userId = :userId AND Cart.bookId = :bookId', { userId, bookId })
      .getOne();
    if (!existInCart) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'this book wasnt found in cart' }));
    }

    await db.cart.remove(existInCart);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    return next(error);
  }
};

export default deleteOne;
