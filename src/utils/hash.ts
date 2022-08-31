import CryptoJS from 'crypto-js';
import config from '../config';

export const encodeHash = (password: string) => {
  return CryptoJS.AES.encrypt(password, config.passwordSalt).toString();
};
// md5 / sha256 / sha512
export const decodeHash = (password: string) => {
  return CryptoJS.AES.decrypt(password, config.passwordSalt)
    .toString(CryptoJS.enc.Utf8);
};
