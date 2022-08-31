import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import ApiError from '../../utils/ApiError';

const getOneUser: Handler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await db.user.findOneBy({
      id: +id,
    });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'user not found' }));
    }

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default getOneUser;
