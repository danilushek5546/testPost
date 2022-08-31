import { object, string, date, number } from 'yup';

const updateUserSchema = object({
  params: object({
    id: number().required(),
  }),
  body: object({
    fullName: string().nullable(),
    email: string().email().required(),
    dob: date().nullable(),
  }),
});

export default updateUserSchema;
