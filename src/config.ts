import dotenv from 'dotenv';
import path from 'path';

const localEnv = dotenv.config({path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultEnv = dotenv.config({path: path.normalize(`${__dirname}/../defailt.env`) }).parsed;

const joinEnv = {
  ...defaultEnv,
  ...localEnv,
};

const config = {
  port: +joinEnv.PORT,
  dbName: joinEnv.DB_NAME,
  dbUser: joinEnv.DB_USER,
  dbPassword: joinEnv.DB_PASSWORD,
  dbHost: joinEnv.DB_HOST,
  dbPort: +joinEnv.DB_PORT,
};

export default config;