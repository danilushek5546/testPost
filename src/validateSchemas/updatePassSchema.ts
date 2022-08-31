import { object, string, number } from 'yup';

const updatePassSchema = object({
  params: object({
    id: number().required(),
  }),
  body: object({
    oldPassword: string().required(),
    newPassword: string().required(),
  }),
});

const updatePassSchema2 = {
  params: {
    id: number().required(),
  },
  body: {
    oldPassword: string().required(),
    newPassword: string().required(),
  },
};

export default updatePassSchema;
