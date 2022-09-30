import "reflect-metadata"
import express from "express";

import usersRoute from './routes/usersRoute'
import authRoute from "./routes/authRoute";
import booksRoute from "./routes/booksRoute";
import customErrorHandler from "./middleware/customErrorHandler";

const apiRoute = express.Router();
apiRoute.use("/api/books", booksRoute);
apiRoute.use("/api/users", usersRoute);
apiRoute.use("/api/auth", authRoute);
apiRoute.use(customErrorHandler);

export default apiRoute