import "reflect-metadata"
import { DataSource } from "typeorm"

import config from "../config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.pass,
    database: config.base,
    synchronize: false,
    logging: false, 
    entities: [__dirname + '/entity/*{.js,.ts}'], 
    migrations: [__dirname + '/migration/*{.ts,.js}'],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))