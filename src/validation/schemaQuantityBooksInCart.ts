import * as yup from 'yup';

const schemaQuantityBooksInCart = {
  body: {
    cartId: yup.number().required(),
    count: yup.number().required(),
  },
};

export default schemaQuantityBooksInCart;
