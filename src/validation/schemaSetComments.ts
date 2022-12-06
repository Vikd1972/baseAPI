import * as yup from 'yup';

const schemaSetComments = {
  body: {
    comment: yup.string().required(),
    bookId: yup.number().required(),
  },
};

export default schemaSetComments;
