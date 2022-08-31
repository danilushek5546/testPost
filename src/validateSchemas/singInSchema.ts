import { object, string } from 'yup';

const singInSchema = object({
  body: object({
    email: string().email().required(),
    password: string().required(),
  }),
});

export default singInSchema;
