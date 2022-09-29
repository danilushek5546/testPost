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

const deleteFavorite: HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId } = req.query;

    const existInFavorite = await db.favorite.createQueryBuilder('Favorite')
      .where('Favorite.userId = :userId AND Favorite.bookId = :bookId', { userId, bookId })
      .getOne();
    if (!existInFavorite) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'this book wasnt found in cart' }));
    }

    await db.favorite.remove(existInFavorite);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    return next(error);
  }
};

export default deleteFavorite;
