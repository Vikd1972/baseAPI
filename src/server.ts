import "reflect-metadata"
import express from "express";
import multer from 'multer'

import apiRoute from "./api";
import AppDataSource from "./db/data-source"

const app = express();
var cors = require('cors');
app.use(express.json())
app.use(cors());
app.use(express.static(__dirname));
app.use(multer({ dest: "uploads" }).single("filedata"));
app.use("/", apiRoute);

AppDataSource.initialize().then(async () => {
    app.listen(3001, function () {
        console.log("Server waiting for connection...");
    });

}).catch(error => console.log(error));
