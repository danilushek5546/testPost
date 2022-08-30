import type { Handler } from 'express';
import db from '../../db';
import ApiError from '../../error/ApiError';

const getAllUsers: Handler = async (req, res, next) => {
  try {
    const users = await db.user.find({});
    return res.json({ users });
  } catch (error) {
    return next(new ApiError({ statusCode: 404, message: 'users not found' }));
  }
};

export default getAllUsers;
