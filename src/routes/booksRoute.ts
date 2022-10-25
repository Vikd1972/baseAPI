import express from "express";

import getBooks from "../controllers/books/getAllBooks";
import getDetailBook from "../controllers/books/getOneBook";
import addToFavorites from "../controllers/books/addToFavorites";
import getRandomBooks from "../controllers/books/getRandomBooks";
import getFavoritesBooks from "../controllers/books/getFavoritesBooks";
import checkToken from "../middleware/checkToken";

const booksRoute = express.Router();
booksRoute.post("/detail", getDetailBook);
booksRoute.post("/favorites", checkToken, addToFavorites);
booksRoute.get("/", getRandomBooks);
booksRoute.put("/", getFavoritesBooks);
booksRoute.post("/", getBooks);
export default booksRoute;