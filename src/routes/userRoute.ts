import express from "express";

import validate from "../middleware/validator";
import querySchemaAdd from "../validation/querySchemaAdd";
import querySchemaChange from "../validation/querySchemaChange";
import checkToken from "../middleware/checkToken";
import addUser from '../controllers/users/userAddController'
import changeUser from '../controllers/users/userChangeController'
import deleteUser from '../controllers/users/userDeleteController'
import getUsers from '../controllers/users/userGetController'

const userRoute = express.Router();
userRoute.post("/", validate(querySchemaAdd) ,addUser);
userRoute.put("/", validate(querySchemaChange), checkToken, changeUser);
userRoute.delete("/", checkToken, deleteUser);
userRoute.get("/", checkToken, getUsers);
 
export default userRoute;
