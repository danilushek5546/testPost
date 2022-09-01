import type * as yup from 'yup';

type ErrorObjectType = {
  field: string;
  path: string;
  message: string;
};

export const yupErrorToErrorObject = (err: yup.ValidationError): ErrorObjectType[] => {
  const errorArray: ErrorObjectType[] = [];

  err.inner.forEach((element) => {
    if (element.path !== undefined) {
      const error: ErrorObjectType = {
        path: element.path.split('.')[0],
        field: element.path.split('.')[1],
        message: element.message,
      };
      errorArray.push(error);
    }
  });
  return errorArray;
};
