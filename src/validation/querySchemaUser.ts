import { object, string, date, SchemaOf, } from 'yup';
import { QuerySchemaUser } from './querySchemaType';
  
const querySchemaUser: SchemaOf<QuerySchemaUser> = object({  
  fullname: string().matches(/^$|\w{3,}/,'must be at least 3 characters long'),  
  email: string().email('must be a valid email').required('Required Email'),
  password: string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),    
});

export default querySchemaUser