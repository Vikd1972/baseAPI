import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { SeederOptions } from 'typeorm-extension';

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
    entities: [__dirname + '/entity/*'], 
    migrations: [__dirname + '/migrations/*'],
    subscribers: [],
})
    
export const connect = () => {
  return AppDataSource.initialize();
};

export default AppDataSource