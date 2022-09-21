import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as fs from 'fs/promises';
import * as uuid from 'uuid';

import ApiError from '../../utils/ApiError';
import db from '../../db';
import type Book from '../../db/entities/Book';
import config from '../../config';

type ParamsType = Record<string, never>;

type ResponseType = {
  book: Book;
};

type BodyType = {
  name: string;
  image: string;
  author: string;
  price: number;
  description: string;
  cover: string;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addGenere: HandlerType = async (req, res, next) => {
  try {
    const {
      name,
      image,
      author,
      price,
      description,
      cover,
    } = req.body;

    const base64Image = image.split(';base64,').pop();
    if (!base64Image) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user not found' }));
    }

    const imageName = `${uuid.v4()}.jpg`;
    const imagePath = `${config.static}${imageName}`;

    fs.writeFile(imagePath, base64Image, { encoding: 'base64' });

    let book = db.book.create({
      name,
      author,
      image: imageName,
      price,
      description,
      cover,
    });

    book = await db.book.save(book);

    return res.json({ book });
  } catch (error) {
    return next(error);
  }
};

export default addGenere;
