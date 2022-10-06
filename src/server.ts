import "reflect-metadata"
import  express from "express";

import apiRoute from "./api";
import AppDataSource from "./db/data-source"

const app = express();
var cors = require('cors');
app.use(express.json())
app.use(cors());
app.use("/", apiRoute);

AppDataSource.initialize().then(async () => {
    app.listen(3001, function () {
        console.log("Server waiting for connection...");
    });

}).catch(error => console.log(error));
