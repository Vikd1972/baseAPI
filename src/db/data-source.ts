import "reflect-metadata"
import { DataSource } from "typeorm"

import config from "../config"

const AppDataSource = new DataSource({
    type: "postgres",
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.pass,
    database: config.base,
    synchronize: true,
    logging: false, 
    entities: [__dirname + '/entity/*{.js,.ts}'], 
    migrations: [],
    subscribers: [],
})
    
export default AppDataSource