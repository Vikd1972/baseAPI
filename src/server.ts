import "reflect-metadata"
const express = require("express");
const app = express();

import { AppDataSource } from "../src/db/data-source"

app.use(express.json())

const userRouter = require("./routes/userRoute");

app.use("/api/users", userRouter);
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

AppDataSource.initialize().then(async () => {
    app.listen(3000, function () {
        console.log("Server waiting for connection...");
    });

}).catch(error => console.log(error));
