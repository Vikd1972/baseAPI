import express from "express";

import checkToken from "../middleware/checkToken";
import getBooks from "../controllers/books/booksGetAllController";
import getDetailBook from "../controllers/books/bookGetOneController copy";

const booksRoute = express.Router();
booksRoute.post("/detail", getDetailBook);
booksRoute.post("/", getBooks);
export default booksRoute;