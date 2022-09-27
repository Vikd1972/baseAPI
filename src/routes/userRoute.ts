import express from "express";

import validate from "../middleware/validator";
import checkToken from "../middleware/checkToken";
const userRoute = express.Router();
userRoute.post("/", checkToken);
export default userRoute;
