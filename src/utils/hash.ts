import CryptoJS from 'crypto-js';

import config from '../config';

export const createHash = async (password: string) => {
  return CryptoJS.HmacMD5(password,
    config.passwordSalt).toString(CryptoJS.enc.Hex);
};
