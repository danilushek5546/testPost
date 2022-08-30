import type { Handler } from 'express';
import CryptoJS from 'crypto-js';
import ApiError from '../../error/ApiError';
import db from '../../db';
import generateJWT from '../../services/generateJWT';
import config from '../../config';

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

    const hash = user?.password || '';
    const decryptPassword = CryptoJS.AES.decrypt(hash, config.salt).toString(CryptoJS.enc.Utf8);

    if (password !== decryptPassword) {
      return next(new ApiError({ statusCode: 404, message: 'wrong password' }));
    }

    const jwt = await generateJWT(user.id, email);

    delete user.password;
    return res.send({ user, jwt });
  } catch (error) {
    return next(error);
  }
};

export default signIn;
