import 'reflect-metadata';
import app from './app';
import AppDataSource from './db/data-source';
import config from './config';

AppDataSource.initialize().then(() => {
  app.listen(config.port, () => {
    console.warn('Server waiting for connection...');
  });
}).catch((error) => console.error(error));
