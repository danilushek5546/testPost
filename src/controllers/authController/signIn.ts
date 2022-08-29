import type { Handler } from 'express';
import ApiError from '../../error/ApiError';
import db from '../../db';
import generateJWT from '../../services/generateJWT';

const signIn: Handler = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const user = await db.user.findOneBy({
      email,
    });

    if (!user) {
      return next(new ApiError({ statusCode: 404, message: 'user not found' }));
    }

    delete user.password;
    const jwt = await generateJWT(user.id, email);
    return res.send({ user, jwt });
  } catch (error) {
    return next(error);
  }
};

export default signIn;
