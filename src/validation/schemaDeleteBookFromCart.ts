import * as yup from 'yup';

const schemaDeleteBookFromCart = {
  body: {
    cartId: yup.number().required(),
  },
};

export default schemaDeleteBookFromCart;
