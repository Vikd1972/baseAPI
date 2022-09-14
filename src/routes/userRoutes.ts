const express = require("express");
const userRouter = express.Router();

const userAddController = require("../controllers/users/userAddController");
userRouter.use("/add", userAddController.user);
const userChangeController = require("../controllers/users/userChangeController");
userRouter.use("/change", userChangeController.user);
const userDeleteController = require("../controllers/users/userDeleteController");
userRouter.use("/delete", userDeleteController.user);
const userGetController = require("../controllers/users/userGetController");
userRouter.use("/", userGetController.user);
 
module.exports = userRouter;