import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

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
    entities: [User], //`${__dirname}/entity/User`
    migrations: ['src/bd/migration/*{.ts,.js}'],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))