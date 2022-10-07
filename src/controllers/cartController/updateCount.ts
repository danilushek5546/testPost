import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';
import type Cart from '../../db/entities/Cart';

type ParametrsType ={
  bookId: number;
  userId: number;
  count: number;
};

type ParamsType = Record<string, never>;

type ResponseType = {
  cart: Cart;
};

type BodyType = {
  params: ParametrsType;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateCount: HandlerType = async (req, res, next) => {
  try {
    const { bookId, userId, count } = req.body.params;

    const bookInCart = await db.cart.createQueryBuilder('Cart')
      .where('Cart.userId = :userId AND Cart.bookId = :bookId ', { bookId, userId })
      .getOne();
    if (!bookInCart) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'this cart wasnt found' }));
    }

    bookInCart.count += count;
    const cart = await db.cart.save(bookInCart);

    return res.json({ cart });
  } catch (error) {
    return next(error);
  }
};

export default updateCount;
