import type { RequestHandler } from 'express';
import { Brackets } from 'typeorm';

import type User from '../../db/entities/User';
import db from '../../db';

type QueryType = {
  page?: string;
  perPage?: string;
  sortBy?: string;
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
    let { page, perPage, search, dobFrom, dobTo } = req.query;
    const { sortDirection, sortBy } = req.query;
    let offset = 0;

    search = `%${search || ''}%`;

    page = page || '0';

    if (perPage) {
      offset = +page * +perPage;
    } else {
      perPage = '0';
    }

    if (!dobTo) {
      const newDate = new Date((Date.now()));
      dobTo = `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDay()}`;
    }

    if (!dobFrom) {
      dobFrom = '0001-01-01';
    }

    const users = await db.user.createQueryBuilder()
      .skip(offset)
      .take(+perPage)
      .orderBy(
        (sortBy || 'id'), (sortDirection || 'ASC'),
      )
      .where(
        new Brackets((qb) => {
          qb.where('User.fullName like :search', { search })
            .orWhere('User.email like :search', { search });
        }),
      )
      .andWhere('User.dob >= :dobFrom AND User.dob <= :dobTo', { dobFrom, dobTo })
      .getMany();

    return res.json({ users });
  } catch (error) {
    return next(error);
  }
};

export default getAllUsers;
