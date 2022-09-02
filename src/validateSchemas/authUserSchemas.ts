import * as yup from 'yup';

import type { ValidationType } from './validationSchemasType';

export const signUpSchema: ValidationType = {
  body: {
    fullName: yup.string(),
    email: yup.string().email().required('email is required'),
    dob: yup.date().max(new Date(Date.now())),
    password: yup.string().required('password is required'),
  },
};

export const singInSchema: ValidationType = {
  body: {
    email: yup.string().email().required('email is required'),
    password: yup.string().required('password is required'),
  },
};
