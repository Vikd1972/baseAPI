import * as yup from 'yup';

const schemaGetDetailBook = {
  query: {
    userId: yup.string(),
    bookId: yup.string().required(),
  },
};

export default schemaGetDetailBook;
