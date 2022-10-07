import "reflect-metadata"
import express from "express";
import multer from "multer";

import booksRoute from "./routes/booksRoute";
import usersRoute from './routes/usersRoute'
import authRoute from "./routes/authRoute";
import uploadRoute from "./routes/uploadRoute";
import customErrorHandler from "./middleware/customErrorHandler";

const app = express();
var cors = require('cors');

app.use(express.json({ limit: '50mb' }));

app.use(express.json())
app.use(cors());
app.use(express.static('/home/dvo/docs/projects/baseAPI'));
app.use(multer({ dest: "uploads" }).single("filedata"));
app.use("/api/books", booksRoute);
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);
app.use(customErrorHandler);

export default app