import { object, string, date, SchemaOf } from 'yup';
import { QuerySchemaLogin } from './querySchemaType';

const querySchemaLogin: SchemaOf<QuerySchemaLogin> = object({     
  email: string().email('must be a valid email').required('Required Email'),
  pass: string().required('Required Password'),
});

export default querySchemaLogin