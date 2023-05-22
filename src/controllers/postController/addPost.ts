import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as uuid from 'uuid';

import db from '../../db';
import ApiError from '../../utils/ApiError';
import type Post from '../../db/entities/Post';
import { minioClient } from '../../app';
import config from '../../config';

type ParamsType = Record<string, never>;

type ResponseType = {
  post: Post;
};

type BodyType = {
  message?: string;
  mediaArray?: string[];
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addPost: HandlerType = async (req, res, next) => {
  try {
    const { message, mediaArray } = req.body;

    if (!req.user) {
      return next(new ApiError({ statusCode: StatusCodes.UNAUTHORIZED, message: 'unauthorized' }));
    }
    const userId = req.user.id;

    const mediaUrlsArray: string[] = [];

    mediaArray?.forEach(async (media: string) => {
      const base64Parse = media.split(';base64,');
      const fileType = base64Parse[0].split('data:').pop();
      const base64 = base64Parse[1];

      const buf = Buffer.from(base64, 'base64');

      if (base64) {
        const fileName = `${uuid.v4()}.${fileType?.split('/')[1]}`;
        const metaData = {
          'Content-Type': fileType,
        };

        await minioClient
          .putObject(config.minio.bucketName, fileName, buf, metaData);
        const fileUrl = await minioClient.presignedUrl('GET', config.minio.bucketName, fileName);
        mediaUrlsArray.push(fileUrl);
      }

      const creationDate = new Date(Date.now());

      let post = db.post.create({
        userId,
        author: req.user.fullName || 'anonimous',
        media: mediaUrlsArray,
        message,
        creationDate,
      });

      post = await db.post.save(post);

      return res.json({ post });
    });
  } catch (error) {
    return next(error);
  }
};

export default addPost;
