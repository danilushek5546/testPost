import type { Handler } from "express";
import User from "../../db/entities/models";
import db from '../../db';

const postUsers: Handler = async (req, res, next) => {
  try {
    console.log(req.body)
    const {
      email,
      fullName,
      dob,
      password,
    } = req.body;
    const user = User.create({
      fullName,
      email,
      dob: new Date(dob),
      password,
    });
    if (!user) {
      throw new Error;
    }
    await db.user.save(user);
    return res.send({ user })
  } catch (error) {
    throw new Error;
  }
}

export default postUsers;