import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import ApiError from '../../utils/ApiError';

type ParamsType = {
  postId: string;
};

type ResponseType = Record<string, never>;

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteOne: HandlerType = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const existedPost = await db.post.findOne({
      where: {
        id: +postId,
      },
    });

    if (!existedPost) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'Post not found' }));
    }

    if (existedPost.userId !== req.user.id) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'Post is not yours' }));
    }

    await db.post.remove(existedPost);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    return next(error);
  }
};

export default deleteOne;
