import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';
import type Book from '../../db/entities/Book';

type ParamsType = {
  id: string;
};

type ResponseType = {
  book: Book;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getBookById: HandlerType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await db.book.findOneBy({
      id: +id,
    });
    if (!book) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'book not found' }));
    }

    return res.json({ book });
  } catch (error) {
    return next(error);
  }
};

export default getBookById;
