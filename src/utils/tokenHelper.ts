import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = async (id: number) => {
  return jwt.sign(
    { id },
    config.token.secretKey,
    { expiresIn: config.token.expiresIn },
  );
};

export const verifyToken = async (token: string) => {
  return jwt.verify(token, config.token.secretKey) as { id: number };
};
