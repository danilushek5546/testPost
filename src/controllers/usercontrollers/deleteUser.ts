import type { Handler } from "express";
import db from '../../db';

const deleteUser: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await db.user.findOneBy({
     id: +id
    })
    if (!user) {
      throw new Error;
    }
    db.user.remove(user);
    return res.send({ user })
  } catch (error) {
    throw new Error;
  }
}

export default deleteUser;