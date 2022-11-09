import express from 'express';

import setRating from '../controllers/rating/setRating';
import getRating from '../controllers/rating/getRating';
import checkToken from '../middleware/checkToken';

const ratingRoute = express.Router();

ratingRoute.post('/get', getRating);
ratingRoute.post('/', checkToken, setRating);

export default ratingRoute;
