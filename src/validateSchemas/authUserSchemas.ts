import * as yup from 'yup';

import type { ValidationType } from './validationSchemasType';

export const signUpSchema: ValidationType = {
  body: {
    fullName: yup.string(),
    email: yup.string().email().required('email is required'),
    // dob: yup.date().max(new Date(Date.now())),
    // dob: yup.string().test({
    //   name: 'is-date',
    //   skipAbsent: true,
    //   test(val, ctx) {
    //     try {
    //       new Date(val);
    //       return true;
    //     } catch (err) {
    //       ctx.createError('Should be date')
    //     }
    //   }
    // }).required('DOB should be provided'),

    // dob: yup.string().test(
    //   'is-date',
    //   () => 'Some test message',
    //   (val) => {
    //     if (!val) return false;
    //     const a = new Date(val);
    //     return a.toString() !== 'Invalid Date';
    //   },
    // ).required(),

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
