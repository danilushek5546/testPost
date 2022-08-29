import jwt from 'jsonwebtoken';
import config from '../config';

const generateJWT = async (id: number, email: string) => {
  return jwt.sign(
    { id, email },
    config.secretKey,
    { expiresIn: config.expiresIn },
  );
};

export default generateJWT;
