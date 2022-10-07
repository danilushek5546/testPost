import * as yup from 'yup';

import type { ValidationType } from './validationSchemasType';

const addComment: ValidationType = {
  body: {
    body: yup.object({
      bookId: yup.string().required(),
      comment: yup.string().required(),
    }),
  },
};

const getComment: ValidationType = {
  query: {
    page: yup.string(),
    perPage: yup.string(),
    bookId: yup.string().required(),
  },
};

export default {
  getComment,
  addComment,
};
