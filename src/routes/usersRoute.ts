import express from 'express';

import getUsers from '../controllers/users/getUsers';
import deleteUser from '../controllers/users/deleteUser';
import uploadUserPhoto from '../controllers/users/uploadPhoto';
import validate from '../middleware/validator';
import checkToken from '../middleware/checkToken';
import changeDataUser from '../controllers/users/changeDataUser';
import querySchemaUser from '../validation/querySchemaUser';

const userRoute = express.Router();
userRoute.use(checkToken);

userRoute.delete('/', deleteUser);
userRoute.patch('/', validate(querySchemaUser), changeDataUser);
userRoute.post('/', uploadUserPhoto);
userRoute.get('/', getUsers);

export default userRoute;
