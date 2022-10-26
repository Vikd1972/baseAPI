import express from 'express';

import addBookToCart from '../controllers/cart/addBookToCart';
import changeQuantity from '../controllers/cart/changeQuantity';
import deleteBookInCart from '../controllers/cart/deleteBookInCart';
import getCart from '../controllers/cart/getCart';
import checkToken from '../middleware/checkToken';

const cartRoute = express.Router();
cartRoute.use(checkToken);

cartRoute.post('/add', addBookToCart);
cartRoute.patch('/change', changeQuantity);
cartRoute.delete('/', deleteBookInCart);
cartRoute.post('/', getCart);

export default cartRoute;
