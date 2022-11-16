import express from 'express';

import addToFavorites from '../controllers/favorites/addToFavorites';
import getFavoritesBooks from '../controllers/favorites/getFavoritesBooks';
import checkToken from '../middleware/checkToken';

const favoritesRoute = express.Router();
favoritesRoute.use(checkToken);

favoritesRoute.post('/', addToFavorites);
favoritesRoute.get('/', getFavoritesBooks);

export default favoritesRoute;
