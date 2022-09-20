import "reflect-metadata"
import  express from "express";

import userRoute from './routes/userRoute'
import authRoute from "./routes/authRoute";
import customErrorHandler from "./middleware/customErrorHandler";
import { AppDataSource } from "../src/db/data-source"

const app = express();
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/login", authRoute);
app.use("/", customErrorHandler);

AppDataSource.initialize().then(async () => {
    app.listen(3000, function () {
        console.log("Server waiting for connection...");
    });

}).catch(error => console.log(error));
