import CryptoJS from 'crypto-js';
import config from '../config';

export const createHash = async (password: string) => {
  return CryptoJS.SHA256(password + config.passwordSalt).toString(CryptoJS.enc.Hex);
};
// md5 / sha256 / sha512
