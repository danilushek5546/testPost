import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../utils/ApiError';
import db from '../../db';
import { generateToken } from '../../utils/tokenHelper';
import { encodeHash } from '../../utils/hash';

const signUp: Handler = async (req, res, next) => {
  try {
    const {
      email,
      fullName,
      dob,
      password,
    } = req.body;

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

    const hash:string = encodeHash(password);

    let user = db.user.create({
      fullName,
      email,
      dob: new Date(dob),
      password: hash,
    });
    user = await db.user.save(user);

    const token = await generateToken(user.id);

    delete user.password;
    return res.json({ user, token });
  } catch (error) {
    return next(error);
  }
};

export default signUp;
