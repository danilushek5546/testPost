import type { RequestHandler } from 'express';

import type Post from '../../db/entities/Post';
import db from '../../db';
import config from '../../config';

type QueryType = {
  page?: string;
};

type ParamsType = Record<string, never>;

type ResponseType = {
  postArray: Post[];
  count: number;
};

type BodyType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getPosts: HandlerType = async (req, res, next) => {
  try {
    let { page } = req.query;
    let offset = 0;
    const perPage = config.perPage;

    page = page || '0';

    offset = perPage * +page;

    const queryBuilder = db.post.createQueryBuilder('Post');

    const posts = await queryBuilder
      .skip(offset)
      .take(+perPage)
      .getManyAndCount();

    const count = posts[1];
    const postArray = posts[0];

    return res.json({ postArray, count });
  } catch (error) {
    return next(error);
  }
};

export default getPosts;
