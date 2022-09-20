import type { RequestHandler } from 'express';
import { Brackets } from 'typeorm';

import db from '../../db';
import type Genere from '../../db/entities/Geners';

type QueryType = Record<string, never>;

type ParamsType = Record<string, never>;

type ResponseType = {
  generes: Genere[];
};

type BodyType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getGeners: HandlerType = async (req, res, next) => {
  try {
    const generes = await db.genere.createQueryBuilder()
      .getMany();

    return res.json({ generes });
  } catch (error) {
    return next(error);
  }
};

export default getGeners;
