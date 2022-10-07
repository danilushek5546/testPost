import type { RequestHandler } from 'express';

import type Favorite from '../../db/entities/Favorite';
import db from '../../db';

type ParamsType = {
  userId: string;
};

type ResponseType = {
  favorite: Favorite[];
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getFavorite: HandlerType = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const favorite = await db.favorite.find({
      where: {
        userId: +userId,
      },
    });

    return res.json({ favorite });
  } catch (error) {
    return next(error);
  }
};

export default getFavorite;
