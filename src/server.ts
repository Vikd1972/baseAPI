/* eslint-disable no-void */
import app from './app';

import AppDataSource from './db/data-source';
import config from './config';

void (async () => {
  try {
    await AppDataSource.initialize();
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server start on port ', config.port);
    });
  } catch (error) {
    console.error(error);
  }
})();
