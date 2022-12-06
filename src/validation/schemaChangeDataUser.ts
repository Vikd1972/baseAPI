import * as yup from 'yup';

const schemaChangeDataUser = {
  body: {
    fullname: yup.string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),
    email: yup.string().email('must be a valid email'),
    oldPassword: yup.string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),
    newPassword: yup.string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),
    confirmPassword: yup.string().matches(/^$|\w{3,}/, 'must be at least 3 characters long'),
  },
};

export default schemaChangeDataUser;
