import type { SchemaOf } from 'yup';
import { object, string } from 'yup';
import type { QuerySchemaLoginType } from './querySchemaType';

const querySchemaLogin: SchemaOf<QuerySchemaLoginType> = object({
  email: string().email('must be a valid email').required('Required Email'),
  password: string().required('Required Password'),
});

export default querySchemaLogin;
