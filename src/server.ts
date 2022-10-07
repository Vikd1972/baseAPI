import "reflect-metadata"

import app from "./api";
import AppDataSource from "./db/data-source"

AppDataSource.initialize().then(async () => {
    app.listen(3001, function () {
        console.log("Server waiting for connection...");
    });

}).catch(error => console.log(error));
