import { object, string, date } from 'yup';

const userSchema = object({
  body: object({
    fullName: string().nullable(),
    email: string().email().required(),
    dob: date().nullable(),
    password: string().required(),
  }),
});

export default userSchema;
