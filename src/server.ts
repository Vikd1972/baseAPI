import "reflect-metadata"
const express = require("express");
const app = express();

import userRoute from './routes/userRoute'
import authRoute from "./routes/authRoute";

// import types from './globalType';

import { AppDataSource } from "../src/db/data-source"

app.use(express.json())

app.use("/api/users", userRoute);
app.use("/api/login", authRoute);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

AppDataSource.initialize().then(async () => {
    app.listen(3000, function () {
        console.log("Server waiting for connection...");
    });

}).catch(error => console.log(error));
