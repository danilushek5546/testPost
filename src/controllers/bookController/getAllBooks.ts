import type { RequestHandler } from 'express';

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
  genere?: number[];
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
    const { sortDirection, sortBy, genere } = req.query;
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

    const queryBuilder = db.book.createQueryBuilder('Book')
      .leftJoin('Book.generes', 'genreForFilter')
      .leftJoinAndSelect('Book.generes', 'genre')
      .orderBy(
        (sortBy && `Book.${sortBy}`) || 'Book.id', sortDirection || 'ASC',
      )
      .where('(Book.name ILIKE :search OR Book.author ILIKE :search)', { search })
      .andWhere('Book.price BETWEEN :priceMin AND :priceMax', { priceMin, priceMax });

    if (genere) {
      // const genereId = genere.split(' ');
      queryBuilder.andWhere('genreForFilter.id IN (:...genere)', { genere });
    }

    const books = await queryBuilder
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
