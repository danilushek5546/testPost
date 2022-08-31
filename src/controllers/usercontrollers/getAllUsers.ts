import type { RequestHandler } from 'express';

import type User from '../../db/entities/User';
import db from '../../db';

type QueryType = {
  page?: string;
  perPage?: string;
  sortBy?: 'id' | 'fullName' | 'email' | 'bod';
  sortDirection?: 'ASC' | 'DESC';
  search?: string; // Search by email or fullName by case insensencetive substring
  dobFrom?: string;
  dobTo?: string; // date string 2001-12-31
};

type ParamsType = Record<string, never>;

type ResponseType = {
  users: User[];
};

type BodyType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAllUsers: HandlerType = async (req, res, next) => {
  try {
    const users = await db.user.find({});

    return res.json({ users });
  } catch (error) {
    return next(error);
  }
};

export default getAllUsers;
