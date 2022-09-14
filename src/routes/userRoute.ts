const express = require("express");
const userRoute = express.Router();

const userAddController = require("../controllers/users/userAddController");
userRoute.use("/add", userAddController.user);
const userChangeController = require("../controllers/users/userChangeController");
userRoute.use("/change", userChangeController.user);
const userDeleteController = require("../controllers/users/userDeleteController");
userRoute.use("/delete", userDeleteController.user);
const userLoginController = require("../controllers/users/userLoginController");
userRoute.use("/login", userLoginController.user);
const userGetController = require("../controllers/users/userGetController");
userRoute.use("/", userGetController.user);
 
module.exports = userRoute;