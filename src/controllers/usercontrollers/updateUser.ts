import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../utils/ApiError';
import db from '../../db';

const updateUser: Handler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      email,
      fullName,
      dob,
    } = req.body;

    const user = await db.user.findOneBy({
      id: +id,
    });

    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'user not found' }));
    }

    const isEmailNotUnique = await db.user.findOne({
      select: {
        email: true,
      },
      where: {
        email,
      },
    });

    if (isEmailNotUnique) {
      return next(new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'user with this email is allready exists',
      }));
    }

    user.dob = new Date(dob);
    user.email = email;
    user.fullName = fullName;

    await db.user.save(user);

    delete user.password;
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default updateUser;
