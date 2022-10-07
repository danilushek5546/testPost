import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';
import type Cart from '../../db/entities/Cart';

type ParamsType = {
  bookId: string;
};

type ResponseType = {
  cart: Cart;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addToCart: HandlerType = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const allreadyInCart = await db.cart.createQueryBuilder('Cart')
      .where('Cart.userId = :userId AND Cart.bookId = :bookId', { userId, bookId })
      .getOne();
    if (allreadyInCart) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'this book allready added to cart' }));
    }

    let cart = db.cart.create({
      userId,
      bookId: +bookId,
    });

    cart = await db.cart.save(cart);

    return res.json({ cart });
  } catch (error) {
    return next(error);
  }
};

export default addToCart;
