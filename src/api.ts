import "reflect-metadata"
import express from "express";

import userRoute from './routes/usersRoute'
import authRoute from "./routes/authRoute";
import booksRoute from "./routes/booksRoute";
import customErrorHandler from "./middleware/customErrorHandler";

const apiRoute = express.Router();
apiRoute.use("/api/books", booksRoute);
apiRoute.use("/api/users", userRoute);
apiRoute.use("/api/auth", authRoute);
apiRoute.use(customErrorHandler);

export default apiRoute