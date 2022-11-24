import express from 'express';

import addOrRemoveToFavorites from '../controllers/favorites/addOrRemoveToFavorites';
import getFavoritesBooks from '../controllers/favorites/getFavoritesBooks';
import checkToken from '../middleware/checkToken';

const favoritesRoute = express.Router();
favoritesRoute.use(checkToken);

favoritesRoute.post('/', addOrRemoveToFavorites);
favoritesRoute.get('/', getFavoritesBooks);

export default favoritesRoute;
