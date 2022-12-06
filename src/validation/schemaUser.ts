import * as yup from 'yup';

const schemaUser = {
  body: {
    fullname: yup.string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),
    email: yup.string().email('must be a valid email'),
    password: yup.string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),
  },
};

export default schemaUser;
