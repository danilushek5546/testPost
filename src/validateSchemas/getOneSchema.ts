import { object, number } from 'yup';

const getOneSchema = object({
  params: object({
    id: number().required(),
  }),
});

export default getOneSchema;
