import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as uuid from 'uuid';
import * as fs from 'fs/promises';

import ApiError from '../../utils/ApiError';
import db from '../../db';
import type User from '../../db/entities/User';
import config from '../../config';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
};

type BodyType = {
  image: string;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const uploadPhoto: HandlerType = async (req, res, next) => {
  try {
    const {
      image,
    } = req.body;
    const id = +req.user.id;

    const user = await db.user.findOne({ where: { id } });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user not found' }));
    }

    const base64Image = image.split(';base64,').pop();
    if (!base64Image) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user not found' }));
    }

    const imageName = `${config.static}${uuid.v4()}.jpg`;
    fs.writeFile(imageName, base64Image, { encoding: 'base64' });
    user.image = base64Image;

    await db.user.save(user);

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default uploadPhoto;
