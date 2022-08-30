import jwt from 'jsonwebtoken';
import config from '../config';

const generateJWT = async (id: number, email: string) => {
  return jwt.sign(
    { id, email },
    config.token.secretKey,
    { expiresIn: config.token.expiresIn },
  );
};

export default generateJWT;
