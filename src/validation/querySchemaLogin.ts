import { object, string, date, SchemaOf } from 'yup';
import { QuerySchemaAuth } from './querySchemaType';

const querySchemaLogin: SchemaOf<QuerySchemaAuth> = object({     
  email: string().email('must be a valid email').required('Required Email'),
  pass: string().required('Required Password'),
});

export default querySchemaLogin