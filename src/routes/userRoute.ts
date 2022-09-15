const express = require("express");
const userRoute = express.Router();

import { checkToken } from "../middleware/checkToken";

import addUser from '../controllers/users/userAddController'
userRoute.post("/", addUser);

import changeUser from '../controllers/users/userChangeController'
userRoute.put("/", checkToken, changeUser);

import deleteUser from '../controllers/users/userDeleteController'
userRoute.delete("/", checkToken, deleteUser);

import getUser from '../controllers/users/userGetController'
userRoute.get("/", checkToken, getUser);
 
export default userRoute;