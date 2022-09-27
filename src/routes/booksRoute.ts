import express from "express";

import validate from "../middleware/validator";
import checkToken from "../middleware/checkToken";

const booksRoute = express.Router();
booksRoute.post("/", checkToken);
export default booksRoute;