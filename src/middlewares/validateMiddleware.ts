import * as yup from 'yup';
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import ApiError from '../utils/ApiError';
import { yupErrorToErrorObject } from '../utils/yupErrorToErrorObject';
import type { ValidationSheasType, ValidationType } from '../validateSchemas/validationSchemasType';

type ErrorObjectType = {
  field: string;
  path: string;
  message: string;
};

const validatitonMiddleware = (schema: ValidationType) => {
  const validate: Handler = async (req, res, next) => {
    const unexpectParamsErrors: ErrorObjectType[] = [];
    const mySchema = yup.object().shape(
      Object.entries(schema).reduce((accum, [key, value]) => {
        const reqKey = key as keyof typeof req;
        Object.keys(req[reqKey]).forEach((item) => {
          if (!Object.keys(value).includes(item)) {
            const error: ErrorObjectType = {
              path: key,
              field: item,
              message: `unexpected param ${item}`,
            };
            unexpectParamsErrors.push(error);
          }
        });
        return {
          ...accum,
          [key]: yup.object().shape(value),
        };
      }, {} as Record<string, yup.ObjectSchema<ValidationSheasType>>),
    );
    try {
      if (unexpectParamsErrors.length !== 0) {
        return next(new ApiError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'validation error',
          data: {
            unexpectParamsErrors,
          },
        }));
      }
      await mySchema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false });

      next();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = yupErrorToErrorObject(err);

        return next(new ApiError({
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'validation error',
          data: {
            errors,
          },
        }));
      }

      next(err);
    }
  };
  return validate;
};

export default validatitonMiddleware;
