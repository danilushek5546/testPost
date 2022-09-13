import type { RequestHandler } from 'express';

import type User from '../../db/entities/User';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
};

type BodyType = {
  id: number;
  email: string;
  fullName?: string;
  dob?: Date;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const auth: HandlerType = async (req, res, next) => {
  try {
    const {
      id,
      email,
      fullName,
      dob,
      photo,
    } = req.user;

    const user = {
      id,
      email,
      fullName,
      dob,
      photo,
    };
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default auth;
