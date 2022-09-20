import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type Genere from '../../db/entities/Geners';
import ApiError from '../../utils/ApiError';
import db from '../../db';

type ParamsType = Record<string, never>;

type ResponseType = {
  genere: Genere;
};

type BodyType = {
  name: string;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addGenere: HandlerType = async (req, res, next) => {
  try {
    const {
      name,
    } = req.body;

    const isGenereNotUnique = await db.genere.findOne({
      select: {
        name: true,
      },
      where: {
        name,
      },
    });

    if (isGenereNotUnique) {
      return next(new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'this genere is allready exists',
      }));
    }

    let genere = db.genere.create({
      name,
    });

    genere = await db.genere.save(genere);

    return res.json({ genere });
  } catch (error) {
    return next(error);
  }
};

export default addGenere;
