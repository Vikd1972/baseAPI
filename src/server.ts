import 'reflect-metadata';

import app from './app';
import AppDataSource from './db/data-source';

AppDataSource.initialize().then(() => {
  app.listen(3001, () => {
    console.warn('Server waiting for connection...');
  });
}).catch((error) => console.error(error));
