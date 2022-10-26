import express from 'express';

import querySchemaUser from '../validation/querySchemaUser';
import querySchemaLogin from '../validation/querySchemaLogin';
import validate from '../middleware/validator';
import authUser from '../controllers/auth/authUser';
import signUpUser from '../controllers/auth/signUpUser';
import restoreUser from '../controllers/auth/restoreUser';

const authRoute = express.Router();

authRoute.post('/sign', validate(querySchemaUser), signUpUser);
authRoute.post('/', validate(querySchemaLogin), authUser);
authRoute.get('/', restoreUser);

export default authRoute;
