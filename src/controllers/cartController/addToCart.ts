import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';
import type Cart from '../../db/entities/Cart';

type ParamsType = {
  bookId: number;
};

type ResponseType = {
  cart: Cart;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const changeBookRate = async (bookId: number, rate: number) => {
  const book = await db.book.findOneBy({ id: bookId });
  const bookRate = await db.rating.findBy({ id: bookId });
  // // eslint-disable-next-line array-callback-return
  // const sumRate = bookRate.reduce((acum, item) => {
  //   // eslint-disable-next-line no-param-reassign
  //   acum.rate += item.rate;
  //   return (acum);
  // });
  let sumRate = 0;
  bookRate.forEach((item) => {
    sumRate += item.rate;
  });
  if (book) {
    book.rating = +((rate + sumRate) / (bookRate.length + 1)).toFixed(1);
  }
};

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
      bookId,
    });

    cart = await db.cart.save(cart);

    return res.json({ cart });
  } catch (error) {
    return next(error);
  }
};

export default addToCart;
