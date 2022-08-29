import type { Handler } from 'express';
import ApiError from '../../error/ApiError';
import db from '../../db';

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

    user.dob = new Date(dob);
    user.email = email;
    user.fullName = fullName;
    user.password = password;
    await db.user.save(user);

    return res.send({ user });
  } catch (error) {
    return next(new Error());
  }
};

export default putUser;
