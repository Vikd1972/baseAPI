import express from "express";

import getUsers from "../controllers/users/usersGetController";
import deleteUser from "../controllers/users/userDeleteController";
import validate from "../middleware/validator";
import checkToken from "../middleware/checkToken";
import changeUser from "../controllers/users/userChangeController";
import querySchemaUser from "../validation/querySchemaUser";

const userRoute = express.Router();
userRoute.delete("/", checkToken, deleteUser);
userRoute.put("/", validate(querySchemaUser), checkToken, changeUser);
userRoute.get("/", checkToken, getUsers);
export default userRoute;
