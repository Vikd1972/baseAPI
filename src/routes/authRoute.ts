import express from 'express';

import querySchemaUser from '../validation/querySchemaUser';
import querySchemaLogin from '../validation/querySchemaLogin';
import validate from '../middleware/validator';
import signInUser from '../controllers/auth/signInUser';
import signUpUser from '../controllers/auth/signUpUser';
import getUserData from '../controllers/auth/getUserData';

const authRoute = express.Router();

authRoute.post('/signUp', validate(querySchemaUser), signUpUser);
authRoute.post('/signIn', validate(querySchemaLogin), signInUser);
authRoute.get('/me', getUserData);

export default authRoute;
