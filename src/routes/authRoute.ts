import querySchemaAdd from '../validation/querySchemaAdd';
import validate from '../middleware/validator';
import loginUser from '../controllers/auth/userLoginController'
import signUser from '../controllers/auth/userSignController'
import express from "express";

const authRoute = express.Router();

authRoute.post("/", loginUser);

authRoute.post("/sign", validate(querySchemaAdd), signUser);

export default authRoute;