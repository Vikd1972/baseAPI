import express from 'express';

import applyValidationScheme from '../middleware/applyValidationScheme';
import schemaAddBookToCart from '../validation/schemaAddBookToCart';
import schemaQuantityBooksInCart from '../validation/schemaQuantityBooksInCart';
import schemaDeleteBookFromCart from '../validation/schemaDeleteBookFromCart';
import addBookToCart from '../controllers/cart/addBookToCart';
import changeQuantity from '../controllers/cart/changeQuantity';
import deleteBookInCart from '../controllers/cart/deleteBookInCart';
import getCart from '../controllers/cart/getCart';
import checkToken from '../middleware/checkToken';

const cartRoute = express.Router();
cartRoute.use(checkToken);

cartRoute.post('/add', applyValidationScheme(schemaAddBookToCart), addBookToCart);
cartRoute.patch('/change', applyValidationScheme(schemaQuantityBooksInCart), changeQuantity);
cartRoute.delete('/', applyValidationScheme(schemaDeleteBookFromCart), deleteBookInCart);
cartRoute.get('/', getCart);

export default cartRoute;
