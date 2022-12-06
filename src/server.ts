/* eslint-disable no-void */
import app from './app';

import { connect } from './db/data-source';
import config from './config';

void (async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server start on port', config.port);
    });
  } catch (error) {
    console.error(error);
  }
})();
