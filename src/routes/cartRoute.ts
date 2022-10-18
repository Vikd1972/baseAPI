import express from "express";

import addBookToCart from "../controllers/cart/addBookToCart";
import getCart from "../controllers/cart/getCart";

const cartRoute = express.Router();
cartRoute.post("/add", addBookToCart);
cartRoute.post("/", getCart);

export default cartRoute;