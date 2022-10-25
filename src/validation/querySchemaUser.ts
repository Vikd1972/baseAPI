import type { SchemaOf } from 'yup';
import { object, string } from 'yup';
import type { QuerySchemaUserType } from './querySchemaType';

const querySchemaUser: SchemaOf<QuerySchemaUserType> = object({
  fullname: string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),
  email: string().email('must be a valid email'),
  password: string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),
});

export default querySchemaUser;
