import express from 'express';

import setRating from '../controllers/rating/setRating';
import checkToken from '../middleware/checkToken';
import applyValidationScheme from '../middleware/applyValidationScheme';
import schemaSetRating from '../validation/schemaSetRating';

const ratingRoute = express.Router();
ratingRoute.use(checkToken);

ratingRoute.post('/', applyValidationScheme(schemaSetRating), setRating);

export default ratingRoute;
