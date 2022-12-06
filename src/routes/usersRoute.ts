import express from 'express';

import applyValidationScheme from '../middleware/applyValidationScheme';
import schemaChangeDataUser from '../validation/schemaChangeDataUser';
import checkToken from '../middleware/checkToken';
import getUsers from '../controllers/users/getUsers';
import deleteUser from '../controllers/users/deleteUser';
import uploadUserPhoto from '../controllers/users/uploadPhoto';
import changeDataUser from '../controllers/users/changeDataUser';

const userRoute = express.Router();
userRoute.use(checkToken);

userRoute.delete('/:userId', deleteUser);
userRoute.patch('/', applyValidationScheme(schemaChangeDataUser), changeDataUser);
userRoute.post('/', uploadUserPhoto);
userRoute.get('/', getUsers);

export default userRoute;
