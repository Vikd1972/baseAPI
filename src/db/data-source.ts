import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

const config = require('../config')

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.default.host,
    port: config.default.port,
    username: config.default.user,
    password: config.default.pass,
    database: config.default.base,
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))