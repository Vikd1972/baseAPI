import express from "express";

import getBooks from "../controllers/books/getAllBooks";
import getDetailBook from "../controllers/books/getOneBook";
import getRandomBook from "../controllers/books/getRandomBook";

const booksRoute = express.Router();
booksRoute.post("/detail", getDetailBook);
booksRoute.post("/random", getRandomBook);
booksRoute.post("/", getBooks);
export default booksRoute;