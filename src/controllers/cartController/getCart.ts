import type { RequestHandler } from 'express';

import db from '../../db';
import type Cart from '../../db/entities/Cart';

type ParamsType = {
  userId: number;
};

type ResponseType = {
  cart: Cart[];
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getCart: HandlerType = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const cart = await db.cart.find({
      where: {
        userId,
      },
    });

    return res.json({ cart });
  } catch (error) {
    return next(error);
  }
};

export default getCart;
