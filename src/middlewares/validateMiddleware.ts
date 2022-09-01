import * as yup from 'yup';
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';
import { yupErrorToErrorObject } from '../utils/yupErrorToErrorObject';
import type { ValidationSheasType, ValidationType } from '../validateSchemas/validationSchemasType';

const validatitonMiddleware = (schema: ValidationType) => {
  const validate: Handler = async (req, res, next) => {
    const mySchema = yup.object().shape(
      Object.entries(schema).reduce((accum, element) => {
        return {
          ...accum,
          [element[0]]: yup.object().shape(element[1]).noUnknown(true),
        };
      }, {} as Record<string, yup.ObjectSchema<ValidationSheasType>>),
    );
    try {
      await mySchema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false, strict: true });

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
