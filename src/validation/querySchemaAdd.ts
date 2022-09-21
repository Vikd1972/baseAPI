import { object, string, date, SchemaOf } from 'yup';
import {QuerySchemaAdd} from './querySchemaType';

const querySchemaAdd: SchemaOf<QuerySchemaAdd> = object({  
  fullname: string().min(3, 'must be at least 3 characters long').required('Required Fullname'),
  email: string().email('must be a valid email').required('Required Email'),
  dob: date().required('Required Date of birthday!'),
  pass: string().min(8, 'must be at least 8 characters long').required('Required Password'),
});

export default querySchemaAdd