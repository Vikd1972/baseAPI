import { object, string, date, SchemaOf } from 'yup';
import { QuerySchemaAuth } from './querySchemaType';

const querySchemaAdd: SchemaOf<QuerySchemaAuth> = object({  
  email: string().email('must be a valid email').required('Required Email'),
  pass: string().min(8, 'must be at least 8 characters long').required('Required Password'),
});

export default querySchemaAdd