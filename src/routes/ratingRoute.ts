import express from 'express';

import setRating from '../controllers/rating/setRating';
import checkToken from '../middleware/checkToken';

const ratingRoute = express.Router();
ratingRoute.use(checkToken);

ratingRoute.post('/', setRating);

export default ratingRoute;
