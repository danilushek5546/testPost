import type { Handler } from "express";
import db from '../../db';

const putUser: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      email,
      fullName,
      dob,
      password,
    } = req.body;
    const user = await db.user.findOneBy({
     id: +id
    })
    if (!user) {
      throw new Error;
    }
    user.dob = new Date(dob);
    user.email = email;
    user.fullName = fullName;
    user.password = password;
    await db.user.save(user);
    return res.send({ user })
  } catch (error) {
    throw new Error;
  }
}

export default putUser;