import express from "express";

import addBookToCart from "../controllers/cart/addBookToCart";

const cartRoute = express.Router();
cartRoute.post("/", addBookToCart);

export default cartRoute;