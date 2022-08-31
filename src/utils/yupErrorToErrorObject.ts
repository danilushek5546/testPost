import type * as yup from 'yup';

type ErrorObjectType = {
  [field: string]: string[];
};

export const yupErrorToErrorObject = (err: yup.ValidationError): ErrorObjectType => {
  const object: ErrorObjectType = {};

  err.inner.forEach((element) => {
    if (element.path !== undefined) {
      object[element.path] = element.errors;
    }
  });

  return object;
};
