import * as yup from 'yup';
import type { ValidationType } from './validationSchemasType';

export const signUpSchema: ValidationType = {
  body: {
    fullName: yup.string(),
    email: yup.string().email().required(),
    dob: yup.string(),
    password: yup.string().required(),
  },
};

export const singInSchema: ValidationType = {
  body: {
    email: yup.string().email().required(),
    password: yup.string().required(),
  },
};
