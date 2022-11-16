import express from 'express';

import setRating from '../controllers/rating/setRating';
import getRating from '../controllers/rating/getRating';
import checkToken from '../middleware/checkToken';

const ratingRoute = express.Router();
ratingRoute.use(checkToken);

ratingRoute.get('/', getRating);
ratingRoute.post('/', setRating);

export default ratingRoute;
