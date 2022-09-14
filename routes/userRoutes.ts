const express = require("express");
const userRouter = express.Router();

const userAddController = require("../controllers/userAddController");
userRouter.use("/add", userAddController.user);
const userChangeController = require("../controllers/userChangeController");
userRouter.use("/change", userChangeController.user);
const userDeleteController = require("../controllers/userDeleteController");
userRouter.use("/delete", userDeleteController.user);
const userGetController = require("../controllers/userGetController");
userRouter.use("/", userGetController.user);
 
module.exports = userRouter;