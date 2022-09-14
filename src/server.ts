import "reflect-metadata"
const express = require("express");
const app = express(); 

import { AppDataSource } from "./data-source"

const userRouter = require("../routes/userRoutes");

app.use(express.json())

app.use("/api/users", userRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

AppDataSource.initialize().then(async () => {
    app.listen(3000, function () {
        console.log("Server waiting for connection...");
    });

}).catch(error => console.log(error));
