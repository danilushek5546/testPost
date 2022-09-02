import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ValidationType } from '../validateSchemas/validationSchemasType';

import ApiError from '../utils/ApiError';

const checkExpectedParams = (schema: ValidationType) => {
  const check: Handler = async (req, res, next) => {
    const reqBody = Object.keys(req.body);
    const reqParams = Object.keys(req.params);
    const reqQuery = Object.keys(req.query);

    const schemaBody = Object.keys(schema.body || {});
    const schemaParams = Object.keys(schema.params || {});
    const schemaQuery = Object.keys(schema.query || {});

    if (reqBody.length !== schemaBody.length ||
      reqParams.length !== schemaParams.length ||
      reqQuery.length !== schemaQuery.length) {
      return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'unexpected parametrs' }));
    }

    reqBody.forEach((element) => {
      if (!schemaBody.includes(element)) {
        return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'unexpected parametrs' }));
      }
    });

    reqParams.forEach((element) => {
      if (!schemaParams.includes(element)) {
        return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'unexpected parametrs' }));
      }
    });

    reqQuery.forEach((element) => {
      if (!schemaQuery.includes(element)) {
        return next(new ApiError({ statusCode: StatusCodes.BAD_REQUEST, message: 'unexpected parametrs' }));
      }
    });
    next();
  };
  return check;
};

export default checkExpectedParams;
