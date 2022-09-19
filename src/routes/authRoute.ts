const express = require("express");
const authRoute = express.Router();
import querySchemaSign from '../validation/querySchemaSign';
import validate from '../middleware/validator';

import loginUser from '../controllers/auth/userLoginController'
authRoute.post("/", loginUser);

import signUser from '../controllers/auth/userSignController'
authRoute.post("/sign", validate(querySchemaSign), signUser);

export default authRoute;