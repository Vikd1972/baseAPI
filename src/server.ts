import "reflect-metadata"
import { AppDataSource } from "./data-source"

const express = require("express");
const app = express();
const userRouter = require('../routes/userRourer')

app.use("/users", userRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

AppDataSource.initialize().then(async () => {

    app.listen(3000, function () {
        console.log("Server waiting for connection...");
    });

}).catch(error => console.log(error));
