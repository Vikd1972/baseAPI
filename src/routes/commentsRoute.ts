import express from 'express';

import setComments from '../controllers/comments/setComments';
import checkToken from '../middleware/checkToken';

const commentsRoute = express.Router();

commentsRoute.post('/', checkToken, setComments);

export default commentsRoute;
