import type { Handler } from "express";
import db from '../../db';

const getAllUsers: Handler = async (req, res, next) => {
  try {
    const users = await db.user.find({});
    return res.send({ users })
  } catch (error) {
    throw new Error;
  }
}

export default getAllUsers;