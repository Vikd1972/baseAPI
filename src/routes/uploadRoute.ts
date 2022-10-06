import express from "express";

import uploadUserPhoto from "../controllers/upload/uploadController";
import checkToken from "../middleware/checkToken";

const uploadRoute = express.Router();
uploadRoute.post("/", checkToken, uploadUserPhoto);
export default uploadRoute;