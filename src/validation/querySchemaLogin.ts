import { object, string } from 'yup';

const querySchemaLogin = object({
  email: string().email('must be a valid email').required('Required Email'),
  password: string().required('Required Password'),
});

export default querySchemaLogin;
