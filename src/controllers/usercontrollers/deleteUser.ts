import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import ApiError from '../../utils/ApiError';

const deleteUser: Handler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await db.user.findOneBy({
      id: +id,
    });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'user not found' }));
    }

    await db.user.remove(user);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default deleteUser;
