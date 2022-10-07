import * as yup from 'yup';

import type { ValidationType } from './validationSchemasType';

const addCart: ValidationType = {
  params: {
    bookId: yup.string().required(),
  },
};

const deleteManyCart: ValidationType = {
  params: {
    userId: yup.string().required(),
  },
};

const deleteOneCart: ValidationType = {
  query: {
    userId: yup.string().required(),
    bookId: yup.string().required(),
  },
};

const getCart: ValidationType = {
  params: {
    userId: yup.string().required(),
  },
};

const upadteCount: ValidationType = {
  body: {
    params: yup.object({
      userId: yup.number().required(),
      bookId: yup.number().required(),
      count: yup.number().required(),
    }),
  },
};

export default {
  upadteCount,
  getCart,
  deleteManyCart,
  deleteOneCart,
  addCart,
};
