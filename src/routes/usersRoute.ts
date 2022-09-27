import express from "express";

import getUsers from "../controllers/users/usersGetController";
import deleteUser from "../controllers/users/userDeleteController";
import validate from "../middleware/validator";
import checkToken from "../middleware/checkToken";

const userRoute = express.Router();
userRoute.delete("/", checkToken, deleteUser);
userRoute.get("/", checkToken, getUsers);
export default userRoute;
