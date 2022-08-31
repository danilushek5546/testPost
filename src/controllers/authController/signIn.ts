import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../utils/ApiError';
import db from '../../db';
import { generateToken } from '../../utils/tokenHelper';
import { decodeHash } from '../../utils/hash';

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
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'user not found' }));
    }

    const decryptPassword:string = decodeHash(user.password!);

    if (password !== decryptPassword) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'wrong password' }));
    }

    const token = await generateToken(user.id);

    delete user.password;
    return res.json({ user, token });
  } catch (error) {
    return next(error);
  }
};

export default signIn;
