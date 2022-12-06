import * as yup from 'yup';

const schemaLogin = {
  body: {
    email: yup.string().email('must be a valid email').required('Required Email'),
    password: yup.string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),
  },
};

export default schemaLogin;
