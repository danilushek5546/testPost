import type { RequestHandler } from 'express';
import { Brackets } from 'typeorm';

import type Book from '../../db/entities/Book';
import db from '../../db';

type QueryType = {
  page?: string;
  perPage?: string;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  search?: string;
  priceMin?: number;
  priceMax?: number;
};

type ParamsType = Record<string, never>;

type ResponseType = {
  booksArray: Book[];
  count: number;
};

type BodyType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAllBooks: HandlerType = async (req, res, next) => {
  try {
    let { page, perPage, search, priceMin, priceMax } = req.query;
    const { sortDirection, sortBy } = req.query;
    let offset = 0;

    search = `%${search || ''}%`;

    page = page || '0';

    if (perPage) {
      offset = +page * +perPage;
    } else {
      perPage = '0';
    }

    if (!priceMin) {
      priceMin = 0;
    }

    if (!priceMax) {
      priceMax = 100;
    }

    const books = await db.book.createQueryBuilder()
      .orderBy(
        (sortBy || 'id'), (sortDirection || 'ASC'),
      )
      .where(
        new Brackets((qb) => {
          qb.where('Book.name ilike :search', { search })
            .orWhere('Book.author ilike :search', { search });
        }),
      )
      .andWhere('Book.price >= :priceMin AND Book.price <= :priceMax', { priceMin, priceMax })
      .skip(offset)
      .take(+perPage)
      .getManyAndCount();

    const count = books[1];
    const booksArray = books[0];

    return res.json({ booksArray, count });
  } catch (error) {
    return next(error);
  }
};

export default getAllBooks;
