import querySchemaSign from '../validation/querySchemaSign';
import validate from '../middleware/validator';
import loginUser from '../controllers/auth/userLoginController'
import signUser from '../controllers/auth/userSignController'
import express from "express";

const authRoute = express.Router();

authRoute.post("/", loginUser);

authRoute.post("/sign", validate(querySchemaSign), signUser);

export default authRoute;