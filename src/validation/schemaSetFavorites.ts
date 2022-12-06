import * as yup from 'yup';

const schemaSetFavorites = {
  body: {
    bookId: yup.number().required(),
  },
};

export default schemaSetFavorites;
