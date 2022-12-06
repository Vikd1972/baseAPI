import express from 'express';

import schemaUser from '../validation/schemaUser';
import schemaLogin from '../validation/schemaLogin';
import applyValidationScheme from '../middleware/applyValidationScheme';
import signInUser from '../controllers/auth/signInUser';
import signUpUser from '../controllers/auth/signUpUser';
import getUserData from '../controllers/auth/getUserData';

const authRoute = express.Router();

authRoute.post('/signUp', applyValidationScheme(schemaUser), signUpUser);
authRoute.post('/signIn', applyValidationScheme(schemaLogin), signInUser);
authRoute.get('/me', getUserData);

export default authRoute;
