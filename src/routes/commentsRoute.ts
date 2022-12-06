import express from 'express';

import setComments from '../controllers/comments/setComments';
import checkToken from '../middleware/checkToken';
import applyValidationScheme from '../middleware/applyValidationScheme';
import schemaSetComments from '../validation/schemaSetComments';

const commentsRoute = express.Router();

commentsRoute.post('/', checkToken, applyValidationScheme(schemaSetComments), setComments);

export default commentsRoute;
