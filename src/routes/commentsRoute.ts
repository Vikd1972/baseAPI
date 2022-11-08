import express from 'express';

import setComments from '../controllers/comments/setComments';
import checkToken from '../middleware/checkToken';

const commentsRoute = express.Router();
commentsRoute.use(checkToken);

commentsRoute.post('/', setComments);

export default commentsRoute;
