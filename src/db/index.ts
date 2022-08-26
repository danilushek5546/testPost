import dbDataSource from "./db";
import User from "./entities/models";


export default {
  user: dbDataSource.getRepository(User),
};