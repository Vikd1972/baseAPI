import { object, string, date, SchemaOf } from 'yup';
import QuerySchemaType from './querySchemaType';

const querySchemaChange: SchemaOf<QuerySchemaType> = object({  
    fullname: string().min(3, 'must be at least 3 characters long').max(70, 'must be less than or equal to 70 characters').notRequired(),
    email: string().email('must be a valid email').required('Required Email'),
    dob: date().notRequired(),
    pass: string().min(8, 'must be at least 8 characters long').notRequired(),
});

export default querySchemaChange