import express from "express";

import addBookToCart from "../controllers/cart/addBookToCart";
import changeQuantity from "../controllers/cart/changeQuantity";
import deleteBookInCart from "../controllers/cart/deleteBookInCart";
import getCart from "../controllers/cart/getCart";
import checkToken from "../middleware/checkToken";

const cartRoute = express.Router();
cartRoute.post("/add", checkToken, addBookToCart);
cartRoute.post("/change", checkToken, changeQuantity); 
cartRoute.delete("/", checkToken, deleteBookInCart);
cartRoute.post("/", checkToken, getCart);

export default cartRoute;