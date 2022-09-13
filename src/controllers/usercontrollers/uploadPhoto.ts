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
  photo: string;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const uploadPhoto: HandlerType = async (req, res, next) => {
  try {
    const {
      photo,
    } = req.body;
    const id = +req.user.id;

    const user = await db.user.findOne({ where: { id } });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user not found' }));
    }

    if (user.photo) {
      const oldImageName = user.photo.slice(config.imagePath.length, user.photo.length);
      const oldImagePath = `${config.static}${oldImageName}`;

      fs.unlink(oldImagePath);
    }

    const base64Image = photo.split(';base64,').pop();
    if (!base64Image) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user not found' }));
    }

    const imageName = `${uuid.v4()}.jpg`;
    const imagePath = `${config.static}${imageName}`;
    const dbPath = `${config.imagePath}${imageName}`;

    fs.writeFile(imagePath, base64Image, { encoding: 'base64' });

    user.photo = dbPath;

    await db.user.save(user);

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default uploadPhoto;
