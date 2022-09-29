import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';
import type Favorite from '../../db/entities/Favorite';

type ParamsType = {
  bookId: number;
};

type ResponseType = {
  favorite: Favorite;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addFavorite: HandlerType = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const allreadyFavorite = await db.favorite.createQueryBuilder('Favorite')
      .where('Favorite.userId = :userId AND Favorite.bookId = :bookId', { userId, bookId })
      .getOne();
    if (allreadyFavorite) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'this book allready added to favorite' }));
    }

    let favorite = db.favorite.create({
      userId,
      bookId,
    });

    favorite = await db.favorite.save(favorite);

    return res.json({ favorite });
  } catch (error) {
    return next(error);
  }
};

export default addFavorite;
