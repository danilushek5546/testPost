import type * as yup from 'yup';

export type ValidationSheasType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.DateSchema;
};

export type ValidationType = {
  body?: ValidationSheasType;
  query?: ValidationSheasType;
  params?: ValidationSheasType;
};
