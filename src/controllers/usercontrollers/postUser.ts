import type { Handler } from 'express';
import User from '../../db/entities/models';
import ApiError from '../../error/ApiError';
import db from '../../db';

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
      return next(new ApiError({ statusCode: 404, message: 'user with this email is allready exists' }));
    }

    let user = User.create({
      fullName,
      email,
      dob: new Date(dob),
      password,
    });

    user = await db.user.save(user);
    return res.send({ user });
  } catch (error) {
    return next(error);
  }
};

export default postUsers;
