import express from 'express';

import getUsers from '../controllers/users/getUsers';
import deleteUser from '../controllers/users/deleteUser';
import validate from '../middleware/validator';
import checkToken from '../middleware/checkToken';
import changeDataUser from '../controllers/users/changeDataUser';
import querySchemaUser from '../validation/querySchemaUser';

const userRoute = express.Router();
userRoute.delete('/', checkToken, deleteUser);
userRoute.put('/', validate(querySchemaUser), checkToken, changeDataUser);
userRoute.get('/', checkToken, getUsers);

export default userRoute;
