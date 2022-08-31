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

export default updatePassSchema;
