import express from "express";

import querySchemaUser from '../validation/querySchemaUser';
import querySchemaLogin from "../validation/querySchemaLogin";
import validate from '../middleware/validator';
import loginUser from '../controllers/auth/userLoginController'
import signUser from '../controllers/auth/userSignController'
import restoreUser from "../controllers/auth/userRestoreController";


const authRoute = express.Router();
authRoute.post("/login", validate(querySchemaLogin), loginUser);
authRoute.post("/sign", validate(querySchemaUser), signUser);
authRoute.post("/token", restoreUser);

export default authRoute; 