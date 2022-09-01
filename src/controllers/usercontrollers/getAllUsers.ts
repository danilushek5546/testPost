import type { RequestHandler } from 'express';
import { Like, Raw } from 'typeorm';

import type User from '../../db/entities/User';
import db from '../../db';

type QueryType = {
  page?: string;
  perPage?: string;
  sortBy?: string;
  sortDirection?: string;
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
  let { page, perPage, sortBy, search } = req.query;
  const { sortDirection, dobFrom, dobTo } = req.query;
  let offset = 0;

  search = `%${search || ''}%`;

  page = page || '0';

  if (perPage) {
    offset = +page * +perPage;
  } else {
    perPage = '0';
  }

  if (!sortBy) {
    sortBy = 'id';
  }

  try {
    const users = await db.user.find({
      skip: offset,
      take: +perPage,
      order: {
        [sortBy]: sortDirection || 'ASC',
      },
      where: [
        {
          fullName: Like(search),
          dob: Raw((alies) => `${alies} >= :dobFrom AND ${alies} <= :dobTo`, { dobFrom, dobTo }),
        },
        {
          email: Like(search),
          dob: Raw((alies) => `${alies} >= :dobFrom AND ${alies} <= :dobTo`, { dobFrom, dobTo }),
        },
      ],
    });

    return res.json({ users });
  } catch (error) {
    return next(error);
  }
};

export default getAllUsers;
