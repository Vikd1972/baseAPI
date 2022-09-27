import "reflect-metadata"
import  express from "express";

import userRoute from './routes/userRoute'
import authRoute from "./routes/authRoute";
import customErrorHandler from "./middleware/customErrorHandler";
import AppDataSource from "./db/data-source"

const app = express();
var cors = require('cors');
app.use(express.json())
app.use(cors());
app.use("/api/books", userRoute);
app.use("/api/auth", authRoute);
app.use(customErrorHandler);

AppDataSource.initialize().then(async () => {
    app.listen(3001, function () {
        console.log("Server waiting for connection...");
    });

}).catch(error => console.log(error));
