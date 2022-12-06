import * as yup from 'yup';

const schemaAddBookToCart = {
  body: {
    bookId: yup.number().required(),
  },
};

export default schemaAddBookToCart;
