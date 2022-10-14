import express from "express";

import checkToken from "../middleware/checkToken";
import getBooks from "../controllers/books/booksGetAllController";

const booksRoute = express.Router();
booksRoute.post("/", checkToken, getBooks);
export default booksRoute;