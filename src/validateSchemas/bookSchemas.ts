import * as yup from 'yup';

import type { ValidationType } from './validationSchemasType';

export const addBook: ValidationType = {
  body: {
    name: yup.string().required(),
    image: yup.string().required(),
    author: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
    cover: yup.string().required(),
  },
};

export const getBooksById: ValidationType = {
  query: {
    booksId: yup.string(),
  },
};

export default {
  addBook,
  getBooksById,
};
