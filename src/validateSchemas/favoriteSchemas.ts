import * as yup from 'yup';

import type { ValidationType } from './validationSchemasType';

const addFavorite: ValidationType = {
  params: {
    bookId: yup.string().required(),
  },
};

const deleteFavorite: ValidationType = {
  query: {
    userId: yup.string().required(),
    bookId: yup.string().required(),
  },
};

const getFavorite: ValidationType = {
  params: {
    userId: yup.string().required(),
  },
};

export default {
  addFavorite,
  deleteFavorite,
  getFavorite,
};
