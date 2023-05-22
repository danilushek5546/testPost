import * as dotenv from 'dotenv';
import path from 'path';

const localEnv = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultEnv = dotenv.config({ path: path.normalize(`${__dirname}/../default.env`) }).parsed;

const joinEnv = {
  ...defaultEnv,
  ...localEnv,
};

const config = {
  serverPort: +joinEnv.PORT,
  db: {
    name: joinEnv.DB_NAME,
    user: joinEnv.DB_USER,
    password: joinEnv.DB_PASSWORD,
    host: joinEnv.DB_HOST,
    port: +joinEnv.DB_PORT,
  },
  token: {
    secretKey: joinEnv.TOKEN_SECRET_KEY,
    expiresIn: joinEnv.TOKEN_EXPIRES_IN,
  },
  passwordSalt: joinEnv.HASH_SALT,
  perPage: 20,
  minio: {
    secretKey: joinEnv.MINIO_SECRET_KEY,
    accessKey: joinEnv.MINIO_ACCESS_KEY,
    host: joinEnv.MINIO_HOST,
    endpoint: joinEnv.MINIO_ENDPOINT,
    bucketName: joinEnv.MINIO_BUCKET_NAME,
  },
};

export default config;
