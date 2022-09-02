import CryptoJS from 'crypto-js';

import config from '../config';

export const createHash = async (password: string) => {
  const rule = 'HmacMD5' || config.hashRule as keyof typeof CryptoJS;
  return CryptoJS[rule](password,
    config.passwordSalt).toString(CryptoJS.enc.Hex);
};
// md5 / sha256 / sha512
