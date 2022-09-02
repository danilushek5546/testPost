import jwt from 'jsonwebtoken';

import config from '../config';

export const generateToken = (id: number) => {
  return jwt.sign(
    { id },
    config.token.secretKey,
    { expiresIn: config.token.expiresIn },
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.token.secretKey) as { id: number };
};
