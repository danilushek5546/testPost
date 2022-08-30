import type * as yup from 'yup';
import type { Handler } from 'express';
import ApiError from '../error/ApiError';

const validatitonMiddleware = (schema: yup.BaseSchema) => {
  const validate: Handler = async (req, res, next) => {
    try {
      await schema.validate({
        body: req?.body,
        query: req?.query,
        params: req?.params,
      });

      next();
    } catch (error) {
      return next(new ApiError({ statusCode: 400, message: `${error}` }));
    }
  };
  return validate;
};

export default validatitonMiddleware;
