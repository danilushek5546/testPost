import type { Handler } from 'express';
import ApiError from '../../error/ApiError';
import User from '../../db/entities/models';
import generateJWT from '../../services/generateJWT';

const check: Handler = async (req, res, next) => {
  try {
    const token = await generateJWT(req.body.id, req.body.email);
    const id = req.body.id;

    const user = await User.findOneBy({ id });
    if (!user) {
      return next(new ApiError({ statusCode: 404, message: 'user not found' }));
    }

    delete user?.password;
    return res.json({ user, token });
  } catch (error) {
    return error;
  }
};

export default check;
