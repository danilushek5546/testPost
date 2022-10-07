import type { RequestHandler } from 'express';

import db from '../../db';
import type Comments from '../../db/entities/Comments';

type QueryType = {
  page?: string;
  perPage?: string;
  bookId: string;
};

type ParamsType = Record<string, never>;

type ResponseType = {
  commentArray: Comments[];
  count: number;
};

type BodyType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAllComments: HandlerType = async (req, res, next) => {
  try {
    const { bookId } = req.query;
    let { page, perPage } = req.query;
    let offset = 0;

    page = page || '0';

    if (perPage) {
      offset = +page * +perPage;
    } else {
      perPage = '0';
    }

    const numBookId = +bookId;

    const comments = await db.comments.createQueryBuilder('Comments')
      .where('Comments.bookId = :numBookId', { numBookId })
      .skip(offset)
      .take(+perPage)
      .getManyAndCount();

    const count = comments[1];
    const commentArray = comments[0];

    return res.json({ commentArray, count });
  } catch (error) {
    return next(error);
  }
};

export default getAllComments;
