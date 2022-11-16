import express from 'express';

import setComments from '../controllers/comments/setComments';
import getComments from '../controllers/comments/getComments';
import checkToken from '../middleware/checkToken';

const commentsRoute = express.Router();

commentsRoute.get('/', getComments);
commentsRoute.post('/', checkToken, setComments);

export default commentsRoute;
