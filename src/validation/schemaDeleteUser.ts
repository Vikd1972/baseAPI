import * as yup from 'yup';

const schemaDeleteUser = {
  query: {
    userId: yup.string().required(),
  },
};

export default schemaDeleteUser;
