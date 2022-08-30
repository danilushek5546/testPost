import type { Handler } from 'express';
import CryptoJS from 'crypto-js';
import ApiError from '../../error/ApiError';
import db from '../../db';
import config from '../../config';

const putUser: Handler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      email,
      fullName,
      dob,
      password,
    } = req.body;

    const user = await db.user.findOneBy({
      id: +id,
    });
    if (!user) {
      return next(new ApiError({ statusCode: 404, message: 'user not found' }));
    }

    const hash = CryptoJS.AES.encrypt(password, config.salt).toString();

    user.dob = new Date(dob);
    user.email = email;
    user.fullName = fullName;
    user.password = hash;
    await db.user.save(user);

    return res.send({ user });
  } catch (error) {
    return next(error);
  }
};

export default putUser;
