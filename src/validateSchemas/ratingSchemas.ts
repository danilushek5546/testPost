import * as yup from 'yup';

import type { ValidationType } from './validationSchemasType';

export const addRatingSchema: ValidationType = {
  body: {
    params: yup.object({
      bookId: yup.number().required(),
      rate: yup.number().required(),
    }),
  },
};
