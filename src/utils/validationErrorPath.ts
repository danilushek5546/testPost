import type * as yup from 'yup';

type ErrorObjectType = {
  [field: string]: string[];
};

export const yupErrorToErrorObject = (err: yup.ValidationError): ErrorObjectType => {
  const object: ErrorObjectType = {};

  err.inner.forEach((i) => {
    if (i.path !== undefined) {
      object[i.path] = i.errors;
    }
  });

  return object;
};
