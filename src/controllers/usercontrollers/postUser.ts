import type { Handler } from 'express';
import CryptoJS from 'crypto-js';
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import ApiError from '../../error/ApiError';
import db from '../../db';
import config from '../../config';

const postUsers: Handler = async (req, res, next) => {
  try {
    const {
      email,
      fullName,
      dob,
      password,
    } = req.body;

    const isEmailUnique = await db.user.findOneBy({
      email,
    });
    if (isEmailUnique) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST,
        message: ReasonPhrases.BAD_REQUEST }));
    }

    const hash = CryptoJS.AES.encrypt(password, config.passwordSalt).toString();

    let user = db.user.create({
      fullName,
      email,
      dob: new Date(dob),
      password: hash,
    });
    user = await db.user.save(user);

    delete user?.password;
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default postUsers;
