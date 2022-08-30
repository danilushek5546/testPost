import type { Handler } from 'express';
import CryptoJS from 'crypto-js';
import ApiError from '../../error/ApiError';
import db from '../../db';
import User from '../../db/entities/User';
import generateJWT from '../../utils/generateJWT';
import config from '../../config';

const signUp: Handler = async (req, res, next) => {
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
      return next(new ApiError({ statusCode: 404, message: 'user with this email is allready exists' }));
    }

    const hash = CryptoJS.AES.encrypt(password, config.passwordSalt).toString();

    let user = db.user.create({
      fullName,
      email,
      dob: new Date(dob),
      password: hash,
    });
    user = await db.user.save(user);

    const jwt = await generateJWT(user.id, email);

    delete user.password;
    return res.json({ user, jwt });
  } catch (error) {
    return next(error);
  }
};

export default signUp;
