import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';
import type Comments from '../../db/entities/Comments';

type ParamsType = Record<string, never>;

type ResponseType = {
  newComment: Comments;
};

type ReqBodyType = {
  bookId: number;
  comment: string;
};

type BodyType = {
  body: ReqBodyType;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addComment: HandlerType = async (req, res, next) => {
  try {
    const { bookId, comment } = req.body.body;
    const userId = req.user.id;

    const isBookExists = await db.book.createQueryBuilder('Book')
      .where('Book.id = :bookId', { bookId })
      .getOne();
    if (!isBookExists) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'Cannot found this book' }));
    }

    let newComment = db.comments.create({
      userId,
      bookId,
      comment,
      dateOfPost: new Date(Date.now()),
    });

    newComment = await db.comments.save(newComment);

    return res.json({ newComment });
  } catch (error) {
    return next(error);
  }
};

export default addComment;
