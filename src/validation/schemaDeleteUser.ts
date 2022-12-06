import * as yup from 'yup';

const schemaDeleteUser = {
  params: {
    userId: yup.number(),
  },
};

export default schemaDeleteUser;
