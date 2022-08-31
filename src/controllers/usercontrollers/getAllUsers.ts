import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import ApiError from '../../utils/ApiError';

const getAllUsers: Handler = async (req, res, next) => {
  try {
    const users = await db.user.find({});
    return res.json({ users });
  } catch (error) {
    return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'users not found' }));
  }
};

export default getAllUsers;
