import * as yup from 'yup';

const schemaSetRating = {
  body: {
    bookId: yup.number().required(),
    onRating: yup.number().required(),
  },
};

export default schemaSetRating;
