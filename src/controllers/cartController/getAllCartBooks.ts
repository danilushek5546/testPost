import type { RequestHandler } from 'express';
import { In } from 'typeorm';

import type Book from '../../db/entities/Book';
import db from '../../db';

type ParamsType = Record<string, never>;

type ResponseType = {
  booksArray: Book[];
  count: number;
};

type BodyType = Record<string, never>;

type QueryType = {
  booksId: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAllCartBooks: HandlerType = async (req, res, next) => {
  try {
    const { booksId } = req.query;
    const ids = booksId.split(',');

    const books = await db.book.createQueryBuilder('Book')
      .where('Book.id IN (:...ids)', { ids })
      .getManyAndCount();

    const count = books[1];
    const booksArray = books[0];

    return res.json({ booksArray, count });
  } catch (error) {
    return next(error);
  }
};

export default getAllCartBooks;
