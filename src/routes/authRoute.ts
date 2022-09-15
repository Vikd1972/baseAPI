const express = require("express");
const authRoute = express.Router();

import loginUser from '../controllers/auth/userLoginController'

authRoute.post("/", loginUser);

export default authRoute;