import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';
import type Cart from '../../db/entities/Cart';

type ParamsType = Record<string, never>;

type ResponseType = {
  cart: Cart;
};

type BodyType = Record<string, never>;

type QueryType = {
  id: number;
  count: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addToCart: HandlerType = async (req, res, next) => {
  try {
    const { id, count } = req.query;

    const bookInCart = await db.cart.createQueryBuilder('Cart')
      .where('Cart.id = :id', { id })
      .getOne();
    if (!bookInCart) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'this cart wasnt found' }));
    }

    bookInCart.count = count;
    const cart = await db.cart.save(bookInCart);

    return res.json({ cart });
  } catch (error) {
    return next(error);
  }
};

export default addToCart;
