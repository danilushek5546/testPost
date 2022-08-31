import * as yup from 'yup';
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';
import { yupErrorToErrorObject } from '../utils/yupErrorToErrorObject';

const validatitonMiddleware = (schema: yup.BaseSchema) => {
  const validate: Handler = async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false });

      next();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const path = yupErrorToErrorObject(err);

        return next(new ApiError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'validation error',
          data: {
            message: err.errors,
            path,
          },
        }));
      }

      next(err);
    }

    // schema.validate({
    //   body: req.body,
    //   query: req.query,
    //   params: req.params,
    // }, { abortEarly: false })
    //   .then(() => next())
    //   .catch((err: yup.ValidationError) => {
    //     const path = yupErrorToErrorObject(err);

    //     return next(new ApiError({
    //       statusCode: StatusCodes.BAD_REQUEST,
    //       message: 'validation error',
    //       data: {
    //         message: err.errors,
    //         path,
    //       },
    //     }));
    //   });
  };
  return validate;
};

export default validatitonMiddleware;
