import express from 'express';

import addOrRemoveToFavorites from '../controllers/favorites/addOrRemoveToFavorites';
import getFavoritesBooks from '../controllers/favorites/getFavoritesBooks';
import checkToken from '../middleware/checkToken';
import applyValidationScheme from '../middleware/applyValidationScheme';
import schemaSetFavorites from '../validation/schemaSetFavorites';

const favoritesRoute = express.Router();
favoritesRoute.use(checkToken);

favoritesRoute.post('/', applyValidationScheme(schemaSetFavorites), addOrRemoveToFavorites);
favoritesRoute.get('/', getFavoritesBooks);

export default favoritesRoute;
