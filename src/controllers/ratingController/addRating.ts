import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import ApiError from '../../utils/ApiError';
import db from '../../db';

type ParamsType = Record<string, never>;

type ResponseType = {
  rating: number;
};

type ParametrsType = {
  bookId: number;
  rate: number;
};

type BodyType = {
  params: ParametrsType;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const changeBookRate = async (bookId: number, rate: number) => {
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
  // eslint-disable-next-line no-param-reassign
  return (+((rate + sumRate) / (bookRate.length + 1)).toFixed(1));
};

const addToCart: HandlerType = async (req, res, next) => {
  try {
    const { bookId, rate } = req.body.params;
    const userId = req.user.id;

    const book = await db.book.findOneBy({ id: bookId });

    if (!book) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'this book doesnt exist' }));
    }

    const allreadyRate = await db.rating.createQueryBuilder('Rating')
      .where('Rating.userId = :userId AND Rating.bookId = :bookId', { userId, bookId })
      .getOne();
    if (allreadyRate) {
      allreadyRate.rate = rate;

      await db.rating.save(allreadyRate);

      const sumRate = await changeBookRate(bookId, rate);
      book.rating = sumRate;

      await db.book.save(book);

      return res.json({ rating: book.rating });
    }

    const rating = db.rating.create({
      userId,
      bookId,
      rate,
    });

    await db.rating.save(rating);

    const sumRate = await changeBookRate(bookId, rate);
    book.rating = sumRate;

    await db.book.save(book);

    return res.json({ rating: book.rating });
  } catch (error) {
    return next(error);
  }
};

export default addToCart;
