import express from "express";

import querySchemaAdd from '../validation/querySchemaAdd';
import validate from '../middleware/validator';
import loginUser from '../controllers/auth/userLoginController'
import signUser from '../controllers/auth/userSignController'

const authRoute = express.Router();
authRoute.post("/", loginUser);
authRoute.post("/sign", validate(querySchemaAdd), signUser);

export default authRoute;