import express from "express";

import addBookToCart from "../controllers/cart/addBookToCart";
import deleteBookInCart from "../controllers/cart/deleteBookInCart";
import getCart from "../controllers/cart/getCart";

const cartRoute = express.Router();
cartRoute.post("/add", addBookToCart);
cartRoute.delete("/", deleteBookInCart);
cartRoute.post("/", getCart);

export default cartRoute;