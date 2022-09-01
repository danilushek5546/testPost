import * as yup from 'yup';
import type { ValidationType } from './validationSchemasType';

export const updatePassSchema: ValidationType = {
  body: {
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
  },
};

export const updateUserSchema: ValidationType = {
  params: {
    id: yup.number().required(),
  },
  body: {
    fullName: yup.string(),
    dob: yup.date(),
    email: yup.string().required(),
  },
};

export const getOneSchema: ValidationType = ({
  params: ({
    id: yup.number().required(),
  }),
});

export const getAllSchema: ValidationType = ({
  query: {
    page: yup.string(),
    perPage: yup.string(),
    sortBy: yup.string(),
    sortDirection: yup.string(),
    search: yup.string(),
    dobFrom: yup.string(),
    dobTo: yup.string(),
  },
});
