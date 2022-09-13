import { request } from "http";

const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");

userRouter.use("/create", userController.addUser);
userRouter.use("/change", userController.changeUser);
userRouter.use("/delete", userController.deleteUser);
userRouter.use("/", userController.getUser);

module.exports = userRouter;