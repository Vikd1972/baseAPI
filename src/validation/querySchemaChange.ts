import { object, string, date, SchemaOf, } from 'yup';
import {QuerySchemaChange} from './querySchemaType';

const querySchemaChange: SchemaOf<QuerySchemaChange> = object({  
  fullname: string().matches(/^$|\w{3,}/,'must be at least 3 characters long'),  
  email: string().email('must be a valid email').required('Required Email'),
  pass: string().matches(/^$|\w{8,}/, 'must be at least 8 characters long'),    
});

export default querySchemaChange